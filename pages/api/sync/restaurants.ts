import { getClient } from 'lib/sanity.client';
import { NextApiRequest, NextApiResponse } from 'next';

interface BigSkyEatsRestaurant {
  id: number;
  name: string;
  address: string;
  cuisine_type: string;
  phone_number?: string;
  website?: string;
  rating?: number;
  review_count?: number;
  latitude?: number;
  longitude?: number;
  price_level?: number;
  summary?: string;
  image?: {
    url: string;
  };
  online_ordering_enabled?: boolean;
  verified?: boolean;
}

interface SanityRestaurant {
  _type: 'restaurant';
  name: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  description?: string;
  cuisine: string;
  image?: {
    _type: 'image';
    asset: {
      _type: 'reference';
      _ref: string;
    };
  };
  address?: string;
  phone?: string;
  website?: string;
  priceRange?: number;
  active: boolean;
  totalVotes: number;
  lastVoteDate?: string;
  bigSkyEatsId: number;
  rating?: number;
  reviewCount?: number;
  latitude?: number;
  longitude?: number;
  verified?: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate admin API key
    const adminKey = req.headers.authorization?.replace('Bearer ', '');
    if (!adminKey || adminKey !== process.env.ADMIN_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get Sanity client
    const client = getClient();

    // Fetch restaurants from BigSkyEatsServer
    const serverUrl = process.env.BIGSKYEATS_SERVER_URL || 'http://localhost:3000';
    const response = await fetch(`${serverUrl}/api/v1/restaurants`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch restaurants: ${response.statusText}`);
    }

    const restaurants: BigSkyEatsRestaurant[] = await response.json();
    console.log(`Fetched ${restaurants.length} restaurants from BigSkyEatsServer`);

    const syncResults = {
      created: 0,
      updated: 0,
      errors: [] as string[],
    };

    // Process each restaurant
    for (const restaurant of restaurants) {
      try {
        // Create slug from restaurant name
        const slug = restaurant.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        // Check if restaurant already exists in Sanity
        const existingRestaurant = await client.fetch(
          `*[_type == "restaurant" && bigSkyEatsId == $id][0]`,
          { id: restaurant.id }
        );

        // Prepare restaurant data for Sanity
        const sanityRestaurant: SanityRestaurant = {
          _type: 'restaurant',
          name: restaurant.name,
          slug: {
            _type: 'slug',
            current: slug,
          },
          description: restaurant.summary || `${restaurant.cuisine_type} restaurant in Big Sky, Montana`,
          cuisine: restaurant.cuisine_type,
          address: restaurant.address,
          phone: restaurant.phone_number,
          website: restaurant.website,
          priceRange: restaurant.price_level || 2,
          active: restaurant.online_ordering_enabled !== false,
          totalVotes: existingRestaurant?.totalVotes || 0,
          lastVoteDate: existingRestaurant?.lastVoteDate,
          bigSkyEatsId: restaurant.id,
          rating: restaurant.rating,
          reviewCount: restaurant.review_count,
          latitude: restaurant.latitude,
          longitude: restaurant.longitude,
          verified: restaurant.verified,
        };

        if (existingRestaurant) {
          // Update existing restaurant
          await client
            .patch(existingRestaurant._id)
            .set({
              name: sanityRestaurant.name,
              description: sanityRestaurant.description,
              cuisine: sanityRestaurant.cuisine,
              address: sanityRestaurant.address,
              phone: sanityRestaurant.phone,
              website: sanityRestaurant.website,
              priceRange: sanityRestaurant.priceRange,
              active: sanityRestaurant.active,
              rating: sanityRestaurant.rating,
              reviewCount: sanityRestaurant.reviewCount,
              latitude: sanityRestaurant.latitude,
              longitude: sanityRestaurant.longitude,
              verified: sanityRestaurant.verified,
            })
            .commit();

          syncResults.updated++;
          console.log(`Updated restaurant: ${restaurant.name}`);
        } else {
          // Create new restaurant
          await client.create(sanityRestaurant);
          syncResults.created++;
          console.log(`Created restaurant: ${restaurant.name}`);
        }
      } catch (error) {
        const errorMessage = `Failed to sync restaurant ${restaurant.name}: ${error instanceof Error ? error.message : 'Unknown error'}`;
        console.error(errorMessage);
        syncResults.errors.push(errorMessage);
      }
    }

    res.status(200).json({
      success: true,
      message: `Restaurant sync completed`,
      results: {
        totalFetched: restaurants.length,
        created: syncResults.created,
        updated: syncResults.updated,
        errors: syncResults.errors.length,
        errorDetails: syncResults.errors,
      },
    });
  } catch (error) {
    console.error('Restaurant sync error:', error);
    res.status(500).json({
      error: 'Failed to sync restaurants',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}