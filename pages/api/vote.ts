import { getClient } from 'lib/sanity.client'
import { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'

import { canUserVote,validateToken } from '../../lib/auth'

// Rate limiting storage (in production, use Redis or database)
const voteAttempts = new Map<string, { count: number; lastAttempt: number }>()

// Clean up old entries every hour
setInterval(() => {
  const oneHourAgo = Date.now() - 60 * 60 * 1000
  for (const [key, value] of voteAttempts.entries()) {
    if (value.lastAttempt < oneHourAgo) {
      voteAttempts.delete(key)
    }
  }
}, 60 * 60 * 1000)

function isRateLimited(userId: string): boolean {
  const now = Date.now()
  const oneHour = 60 * 60 * 1000
  const maxVotesPerHour = 10 // Allow 10 votes per hour per authenticated user
  
  const attempts = voteAttempts.get(userId)
  
  if (!attempts) {
    voteAttempts.set(userId, { count: 1, lastAttempt: now })
    return false
  }
  
  // Reset count if more than an hour has passed
  if (now - attempts.lastAttempt > oneHour) {
    voteAttempts.set(userId, { count: 1, lastAttempt: now })
    return false
  }
  
  // Check if rate limit exceeded
  if (attempts.count >= maxVotesPerHour) {
    return true
  }
  
  // Increment count
  attempts.count++
  attempts.lastAttempt = now
  
  return false
}

async function hasVotedRecently(userId: string, restaurantId: string): Promise<boolean> {
  const client = getClient()
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  
  const existingVote = await client.fetch(
    groq`*[_type == "vote" && userId == $userId && restaurant._ref == $restaurantId && voteDate > $oneDayAgo][0]`,
    { userId, restaurantId, oneDayAgo }
  )
  
  return !!existingVote
}

async function updateRestaurantVoteCount(restaurantId: string): Promise<void> {
  const client = getClient()
  
  // Get total vote count for this restaurant
  const voteCount = await client.fetch(
    groq`count(*[_type == "vote" && restaurant._ref == $restaurantId && isValid == true])`
  )
  
  // Get most recent vote date
  const lastVote = await client.fetch(
    groq`*[_type == "vote" && restaurant._ref == $restaurantId && isValid == true] | order(voteDate desc)[0].voteDate`
  )
  
  // Update restaurant document
  await client
    .patch(restaurantId)
    .set({
      totalVotes: voteCount,
      lastVoteDate: lastVote || null,
    })
    .commit()
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  
  try {
    const { restaurantId } = req.body
    
    if (!restaurantId) {
      return res.status(400).json({ error: 'Restaurant ID is required' })
    }

    // Get and validate authentication token
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required. Please log in to vote.' })
    }

    const token = authHeader.replace('Bearer ', '')
    const authResult = await validateToken(token)
    
    if (!authResult.success || !authResult.user) {
      return res.status(401).json({ error: 'Invalid or expired token. Please log in again.' })
    }

    const user = authResult.user
    
    // Check if user is eligible to vote (local customers only)
    if (!canUserVote(user)) {
      return res.status(403).json({ 
        error: 'Only local customers can vote. Tourists are not eligible to participate in voting.',
        userType: user.customer_type,
        isLocal: user.is_local
      })
    }
    
    const userAgent = req.headers['user-agent'] || 'unknown'
    
    // Rate limiting check
    if (isRateLimited(user.id)) {
      return res.status(429).json({ 
        error: 'Too many votes. Please wait before voting again.',
        retryAfter: 3600 // 1 hour in seconds
      })
    }
    
    // Check if user has voted for this restaurant in the last 24 hours
    const hasVoted = await hasVotedRecently(user.id, restaurantId)
    if (hasVoted) {
      return res.status(409).json({ 
        error: 'You have already voted for this restaurant today. Please try again tomorrow.' 
      })
    }
    
    // Verify restaurant exists and is active
    const client = getClient()
    const restaurant = await client.fetch(
      groq`*[_type == "restaurant" && _id == $restaurantId && active == true][0]`,
      { restaurantId }
    )
    
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found or not active for voting' })
    }
    
    // Create vote document
    const voteDoc = {
      _type: 'vote',
      restaurant: {
        _type: 'reference',
        _ref: restaurantId,
      },
      userId: user.id,
      userEmail: user.email,
      userType: user.customer_type,
      isLocalCustomer: user.is_local,
      voteDate: new Date().toISOString(),
      userAgent,
      isValid: true,
      location: 'Big Sky, MT',
    }
    
    const result = await client.create(voteDoc)
    
    // Update restaurant vote count
    await updateRestaurantVoteCount(restaurantId)
    
    res.status(201).json({ 
      success: true, 
      message: 'Vote recorded successfully!',
      voteId: result._id,
      user: {
        email: user.email,
        type: user.customer_type,
        isLocal: user.is_local
      }
    })
    
  } catch (error) {
    console.error('Vote API error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}