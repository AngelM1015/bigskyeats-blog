import { getClient } from 'lib/sanity.client'
import { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'

// Simple admin authentication - in production, use proper authentication
function isAdminRequest(req: NextApiRequest): boolean {
  const adminKey = process.env.ADMIN_API_KEY
  const providedKey = req.headers['x-admin-key'] || req.query.adminKey
  
  return adminKey && providedKey === adminKey
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  
  // Check admin authentication
  if (!isAdminRequest(req)) {
    return res.status(401).json({ error: 'Unauthorized - Admin access required' })
  }
  
  try {
    const client = getClient()
    
    const restaurants = await client.fetch(
      groq`*[_type == "restaurant"] | order(totalVotes desc, name asc) {
        _id,
        name,
        slug,
        description,
        cuisine,
        "imageUrl": image.asset->url,
        address,
        phone,
        website,
        priceRange,
        totalVotes,
        lastVoteDate,
        isActive,
        _createdAt,
        _updatedAt
      }`
    )
    
    res.status(200).json(restaurants)
    
  } catch (error) {
    console.error('Admin restaurants API error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}