import { getClient } from 'lib/sanity.client'
import { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'

interface EmailResult {
  restaurantId: string
  restaurantName: string
  email: string
  award: string
  success: boolean
  error?: string
}

interface WinnerEmailRequest {
  year?: string
  testMode?: boolean
  recipients?: string[] // For testing with specific restaurant IDs
}

interface Winner {
  _id: string
  name: string
  email: string
  award: string
  voteCount: number
  cuisineTypes?: string[]
  profitShare?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verify admin access
  const adminKey = req.headers.authorization?.replace('Bearer ', '')
  if (adminKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const client = getClient()
    const { year, testMode = false, recipients }: WinnerEmailRequest = req.body
    
    const contestYear = year || new Date().getFullYear().toString()
    const contestPeriod = `BigSkyEats ${contestYear} Community Choice Awards`

    // Calculate date range for the contest
    const startDate = new Date(`${contestYear}-01-01`).toISOString()
    const endDate = new Date(`${contestYear}-12-31T23:59:59`).toISOString()

    // Get contest results
    const restaurantsQuery = groq`
      *[_type == "restaurant"] {
        _id,
        name,
        email,
        cuisineTypes,
        "voteCount": count(*[_type == "vote" && restaurant._ref == ^._id && voteDate >= "${startDate}" && voteDate <= "${endDate}"])
      } | order(voteCount desc)
    `

    const restaurants = await client.fetch(restaurantsQuery)
    
    // Filter recipients if testing mode
    const targetRestaurants = recipients 
      ? restaurants.filter(r => recipients.includes(r._id))
      : restaurants

    // Determine winners - LIMITED for profit sharing
    const overallWinners = targetRestaurants.slice(0, 5).filter(r => r.voteCount >= 10) // Top 5 with min 10 votes
    
    // Group by cuisine for category winners - ONE per category only
    const cuisineGroups: { [cuisine: string]: any[] } = {}
    targetRestaurants.forEach(restaurant => {
      if (restaurant.cuisineTypes && restaurant.cuisineTypes.length > 0 && restaurant.voteCount >= 5) { // Min 5 votes
        restaurant.cuisineTypes.forEach(cuisine => {
          if (!cuisineGroups[cuisine]) {
            cuisineGroups[cuisine] = []
          }
          cuisineGroups[cuisine].push(restaurant)
        })
      }
    })

    const categoryWinners: { [cuisine: string]: any } = {}
    Object.keys(cuisineGroups).forEach(cuisine => {
      const sorted = cuisineGroups[cuisine].sort((a, b) => b.voteCount - a.voteCount)
      if (sorted.length > 0 && sorted[0].voteCount >= 5) {
        categoryWinners[cuisine] = sorted[0] // Only the top restaurant per category
      }
    })

    // Calculate profit sharing
    const totalWinners = overallWinners.length + Object.keys(categoryWinners).length
    const profitSharePerWinner = totalWinners > 0 ? (15 / totalWinners).toFixed(2) : "0"

    // Prepare emails to send
    const emailResults: EmailResult[] = []
    const winnersToEmail = new Set<Winner>()

    // Add overall winners
    overallWinners.forEach((restaurant, index) => {
      if (restaurant.email && restaurant.voteCount > 0) {
        winnersToEmail.add({
          ...restaurant,
          award: index === 0 ? 'Overall Winner - 1st Place' : 
                 index === 1 ? 'Overall Winner - 2nd Place' : 
                 'Overall Winner - 3rd Place',
          profitShare: profitSharePerWinner
        } as Winner)
      }
    })

    // Add category winners
    Object.entries(categoryWinners).forEach(([cuisine, restaurant]) => {
      if (restaurant.email) {
        winnersToEmail.add({
          ...restaurant,
          award: `Best ${cuisine} Restaurant`,
          profitShare: profitSharePerWinner
        } as Winner)
      }
    })

    // Send emails (simulate in test mode)
    for (const winner of winnersToEmail) {
      try {
        if (testMode) {
          // In test mode, just log what would be sent
          console.log(`[TEST MODE] Would send email to ${winner.email}:`)
          console.log(`Subject: 🏆 Congratulations! ${winner.name} - ${winner.award} - ${contestPeriod}`)
          
          emailResults.push({
            restaurantId: winner._id,
            restaurantName: winner.name,
            email: winner.email,
            award: winner.award,
            success: true
          })
        } else {
          // In production, integrate with your email service (SendGrid, Mailgun, etc.)
          const emailSent = await sendWinnerEmail(winner, contestPeriod)
          
          emailResults.push({
            restaurantId: winner._id,
            restaurantName: winner.name,
            email: winner.email,
            award: winner.award,
            success: emailSent.success,
            error: emailSent.error
          })
        }
      } catch (error) {
        emailResults.push({
          restaurantId: winner._id,
          restaurantName: winner.name,
          email: winner.email,
          award: winner.award,
          success: false,
          error: error.message
        })
      }
    }

    res.status(200).json({
      success: true,
      contestPeriod,
      testMode,
      emailsSent: emailResults.filter(r => r.success).length,
      emailsFailed: emailResults.filter(r => !r.success).length,
      results: emailResults
    })

  } catch (error) {
    console.error('Error sending winner emails:', error)
    res.status(500).json({ error: 'Failed to send winner emails' })
  }
}

// Email sending function - integrate with your preferred email service
async function sendWinnerEmail(winner: Winner, contestPeriod: string) {
  try {
    // TODO: Replace with actual email service integration
    // Example with SendGrid, Mailgun, or similar service
    
    const emailContent = generateWinnerEmailContent(winner, contestPeriod)
    
    // Simulate email sending for now
    console.log(`Sending email to ${winner.email}:`)
    console.log(`Subject: ${emailContent.subject}`)
    console.log(`Body: ${emailContent.body}`)
    
    // In production, replace with actual email service call:
    // const result = await emailService.send({
    //   to: winner.email,
    //   subject: emailContent.subject,
    //   html: emailContent.body
    // })
    
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

function generateWinnerEmailContent(winner: Winner, contestPeriod: string) {
  const subject = `🏆 Congratulations! ${winner.name} - ${winner.award} - ${contestPeriod}`
  
  const body = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2c5530; text-align: center;">🏆 Congratulations!</h1>
          
          <p>Dear ${winner.name} team,</p>
          
          <p>We are thrilled to announce that <strong>${winner.name}</strong> has been selected as the <strong>${winner.award}</strong> in the ${contestPeriod}!</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #2c5530; margin-top: 0;">🎉 Award Details</h2>
            <p><strong>Restaurant:</strong> ${winner.name}</p>
            <p><strong>Award:</strong> ${winner.award}</p>
            <p><strong>Total Votes:</strong> ${winner.voteCount}</p>
            <p><strong>Contest:</strong> ${contestPeriod}</p>
          </div>
          
          ${winner.profitShare ? `
          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #856404; margin-top: 0;">💰 Profit Sharing Program</h2>
            <p>As a Community Choice Award winner, your restaurant will receive <strong>${winner.profitShare}%</strong> of BigSkyEats' annual profit sharing pool (15% of pure profits).</p>
            <p>This dividend will be distributed quarterly based on your award status. Details on payment schedule and amounts will be provided separately.</p>
          </div>
          ` : ''}
          
          <p>This recognition is a testament to your commitment to excellence and the outstanding experience you provide to the Big Sky community. Your customers have spoken, and they love what you do!</p>
          
          <h3 style="color: #2c5530;">What's Next?</h3>
          <ul>
            <li>We'll be featuring your restaurant on our website and social media</li>
            <li>You'll receive a digital award certificate for display</li>
            <li>Consider promoting this achievement to attract new customers</li>
            <li>Join us for the annual awards celebration (details to follow)</li>
            ${winner.profitShare ? '<li>Profit sharing distribution schedule and details</li>' : ''}
          </ul>
          
          <p>Thank you for being an integral part of the Big Sky dining community. We look forward to continuing to support local businesses like yours.</p>
          
          <p>Congratulations once again!</p>
          
          <p>Best regards,<br>
          The BigSkyEats Team</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666; text-align: center;">
            BigSkyEats - Supporting Local Restaurants • Building Community • Sharing Success<br>
            <a href="mailto:info@bigskyeats.com">info@bigskyeats.com</a>
          </p>
        </div>
      </body>
    </html>
  `
  
  return { subject, body }
}