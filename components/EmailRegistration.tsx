import { useState } from 'react'

interface EmailRegistrationProps {
  onSubmit: (email: string, userType: string) => void
}

export default function EmailRegistration({ onSubmit }: EmailRegistrationProps) {
  const [email, setEmail] = useState('')
  const [userType, setUserType] = useState('customer')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !userType) return

    setIsSubmitting(true)
    
    try {
      // Submit to Rails backend for admin approval
      const response = await fetch('http://localhost:3000/api/v1/email_registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_registration: {
            email: email,
            user_type: userType,
            status: 'pending_approval',
            source: 'blog_landing_page'
          }
        })
      })

      if (response.ok) {
        setSubmitted(true)
        setEmail('')
        onSubmit(email, userType)
      }
    } catch (error) {
      console.error('Failed to submit email registration:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-800">
          <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
          <p>Your email has been submitted for approval. We'll contact you soon about joining BigSkyEats in Big Sky, MT!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Join BigSkyEats
        </h3>
        <p className="text-gray-600">
          Get early access to Big Sky's premier food delivery service
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">
            I want to join as a:
          </label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="customer">Customer (Order Food)</option>
            <option value="restaurant_owner">Restaurant Owner (Partner with Us)</option>
            <option value="local_customer">Local Resident (Non-Subscriber)</option>
          </select>
        </div>

        <div className="text-xs text-gray-500">
          <p>
            {userType === 'customer' && 'Join as a customer to order from Big Sky\'s best restaurants with delivery to your location.'}
            {userType === 'restaurant_owner' && 'Partner with BigSkyEats to expand your restaurant\'s reach in the Big Sky community.'}
            {userType === 'local_customer' && 'Local Big Sky residents can use our service without a subscription (subject to admin approval).'}
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !email}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Request Access'}
        </button>
      </form>

      <div className="mt-4 text-center text-xs text-gray-500">
        <p>All registrations require admin approval. We'll contact you within 24 hours.</p>
      </div>
    </div>
  )
}
