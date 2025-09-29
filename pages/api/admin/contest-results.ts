import { getClient } from 'lib/sanity.client'
import { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'

interface ContestResults {
  contestPeriod: string
  totalVotes: number
  totalRestaurants: number
  totalWinners: number
  profitSharePerWinner: string
  winners: {
    overall: Restaurant[]
    byCategory: { [category: string]: Restaurant[] }
  }
  results: RestaurantResult[]
}

interface Restaurant {
  _id: string
  name: string
  email?: string
  cuisineTypes?: string[]
  voteCount: number
}

interface RestaurantResult extends Restaurant {
  rank: number
  percentage: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verify admin access
  const adminKey = req.headers.authorization?.replace('Bearer ', '')
  if (adminKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const client = getClient()
    
    // Get contest period from query params (default to current year)
    const contestYear = req.query.year || new Date().getFullYear().toString()
    const contestPeriod = `BigSkyEats ${contestYear} Community Choice Awards`

    // Calculate date range for the contest (e.g., entire year or specific period)
    const startDate = new Date(`${contestYear}-01-01`).toISOString()
    const endDate = new Date(`${contestYear}-12-31T23:59:59`).toISOString()

    // Get all restaurants with their vote counts for the contest period
    const restaurantsQuery = groq`
      *[_type == "restaurant"] {
        _id,
        name,
        email,
        cuisineTypes,
        "voteCount": count(*[_type == "vote" && restaurant._ref == ^._id && voteDate >= "${startDate}" && voteDate <= "${endDate}"])
      } | order(voteCount desc)
    `

    const restaurants: Restaurant[] = await client.fetch(restaurantsQuery)
    
    // Calculate total votes
    const totalVotes = restaurants.reduce((sum, restaurant) => sum + restaurant.voteCount, 0)
    
    // Create results with rankings and percentages
    const results: RestaurantResult[] = restaurants.map((restaurant, index) => ({
      ...restaurant,
      rank: index + 1,
      percentage: totalVotes > 0 ? Math.round((restaurant.voteCount / totalVotes) * 100) : 0
    }))

    // Determine overall winners - LIMITED for profit sharing (top 5 only)
    const overallWinners = results.slice(0, 5).filter(r => r.voteCount >= 10) // Minimum 10 votes to qualify

    // Determine winners by cuisine category - ONE winner per category only
    const winnersByCategory: { [category: string]: Restaurant[] } = {}
    
    // Group restaurants by cuisine type and find top restaurant in each category
    const cuisineGroups: { [cuisine: string]: Restaurant[] } = {}
    
    restaurants.forEach(restaurant => {
      if (restaurant.cuisineTypes && restaurant.cuisineTypes.length > 0 && restaurant.voteCount >= 5) { // Min 5 votes for category
        restaurant.cuisineTypes.forEach(cuisine => {
          if (!cuisineGroups[cuisine]) {
            cuisineGroups[cuisine] = []
          }
          cuisineGroups[cuisine].push(restaurant)
        })
      }
    })

    // Find winner for each cuisine category (only ONE per category)
    Object.keys(cuisineGroups).forEach(cuisine => {
      const categoryRestaurants = cuisineGroups[cuisine].sort((a, b) => b.voteCount - a.voteCount)
      if (categoryRestaurants.length > 0 && categoryRestaurants[0].voteCount >= 5) {
        winnersByCategory[cuisine] = [categoryRestaurants[0]] // Only the top restaurant
      }
    })

    // Calculate profit sharing distribution
    const totalWinners = overallWinners.length + Object.keys(winnersByCategory).length
    const profitSharePerWinner = totalWinners > 0 ? (15 / totalWinners).toFixed(2) : "0"

    const contestResults: ContestResults = {
      contestPeriod,
      totalVotes,
      totalRestaurants: restaurants.length,
      totalWinners,
      profitSharePerWinner,
      winners: {
        overall: overallWinners,
        byCategory: winnersByCategory
      },
      results
    }

    res.status(200).json(contestResults)

  } catch (error) {
    console.error('Error fetching contest results:', error)
    res.status(500).json({ error: 'Failed to fetch contest results' })
  }
}