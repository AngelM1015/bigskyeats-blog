import { NextApiRequest, NextApiResponse } from 'next'
import { getClient } from 'lib/sanity.client'
import { groq } from 'next-sanity'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  
  try {
    const client = getClient()
    
    const restaurants = await client.fetch(
      groq`*[_type == "restaurant" && isActive == true] | order(totalVotes desc, name asc) {
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
        lastVoteDate
      }`
    )
    
    res.status(200).json(restaurants)
    
  } catch (error) {
    console.error('Restaurants API error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}