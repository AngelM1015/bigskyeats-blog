import { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'

interface EmailSignupFormProps {
  title?: string
  description?: string
  buttonText?: string
}

export const EmailSignupForm = ({ 
  title = "Stay Updated with BigSkyEats",
  description = "Get the latest updates on new restaurants, exclusive deals, and Big Sky food news delivered to your inbox.",
  buttonText = "Subscribe"
}: EmailSignupFormProps) => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Submit to Rails backend email_registrations endpoint
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? 'https://bigskyeats.app/api/v1/email_registrations'
        : 'http://localhost:3000/api/v1/email_registrations'

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_registration: {
            email: email,
            user_type: 'newsletter_subscriber',
            source: 'blog_footer_signup',
            status: 'pending_approval',
          },
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setEmail('')
      } else {
        setError('Unable to subscribe. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
          Thanks for subscribing!
        </h3>
        <p className="text-green-700 dark:text-green-300">
          You'll receive updates about BigSkyEats and Big Sky food news.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-[#FF0B5C] to-[#F09B00] dark:from-[#F09B00] dark:to-[#FF0B5C] rounded-lg p-6 text-white">
      <div className="text-center mb-4">
        <Mail className="w-8 h-8 mx-auto mb-3" />
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/90 text-sm">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-md border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-[#FF0B5C] dark:text-[#F09B00] font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Subscribing...' : buttonText}
          </button>
        </div>
        
        {error && (
          <p className="text-red-200 text-sm text-center">{error}</p>
        )}
      </form>

      <p className="text-xs text-white/70 text-center mt-3">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  )
}
