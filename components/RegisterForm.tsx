import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AuthContext } from '../contexts/AuthContext'
import { registerUser } from '../lib/auth'

interface RegisterFormProps {
  email?: string
  source?: string
}

const RegisterForm: React.FC<RegisterFormProps> = ({ email: prefilledEmail, source }) => {
  const [formData, setFormData] = useState({
    email: prefilledEmail || '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
    customer_type: 'tourist' as 'tourist' | 'non_subscribed_local'
  })
  const [selectedType, setSelectedType] = useState('tourist')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()
  const { login } = useContext(AuthContext)!

  // Context-aware functionality - detect source and pre-fill information
  useEffect(() => {
    const { email: queryEmail, source: querySource, firstName, lastName } = router.query
    
    if (queryEmail && typeof queryEmail === 'string') {
      setFormData(prev => ({ ...prev, email: queryEmail }))
    }
    
    if (firstName && typeof firstName === 'string') {
      setFormData(prev => ({ ...prev, first_name: firstName }))
    }
    
    if (lastName && typeof lastName === 'string') {
      setFormData(prev => ({ ...prev, last_name: lastName }))
    }

    // Set customer type based on source context - but only for UI display
    if (querySource === 'local' || querySource === 'resident') {
      setSelectedType('non_subscribed_local')
    } else if (querySource === 'tourist' || querySource === 'visitor') {
      setSelectedType('tourist')
    }
    // Always keep actual customer_type as 'tourist' for server registration
  }, [router.query])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === 'customer_type') {
      // Update the UI selection but don't change the actual customer_type sent to server
      setSelectedType(value as 'tourist' | 'non_subscribed_local')
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Validate password confirmation
    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const response = await registerUser(formData)
      
      if (response.success && response.token && response.user) {
        login(response.token, response.user)
        setSuccess(`Welcome to BigSkyEats, ${formData.first_name}! Your account has been created successfully.`)
        
        setTimeout(() => {
          router.push('/')
        }, 2000)
      } else {
        setError(response.error || 'Registration failed')
      }
    } catch (err) {
      setError('An error occurred during registration')
    } finally {
      setLoading(false)
    }
  }

  const getWelcomeMessage = () => {
    if (source === 'voting') {
      return 'Join BigSkyEats to vote on restaurants and share your dining experiences! Note: Voting requires local resident status, which needs admin approval.'
    } else if (source === 'local') {
      return 'Welcome local! Join our community to discover the best dining spots in your area. Your local status will be reviewed by our admin team.'
    } else if (source === 'tourist') {
      return 'Visiting Big Sky? Create an account to find the perfect dining experiences during your stay!'
    }
    return 'Join the BigSkyEats community and discover amazing dining experiences!'
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white dark:bg-[#18181B] border-2 border-black dark:border-[#18181B] rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-black dark:text-white">
        Create Your Account
      </h2>
      
      <p className="text-center mb-8 text-gray-600 dark:text-gray-400 text-sm">
        {getWelcomeMessage()}
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-500 text-white rounded-lg text-center">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-500 text-white rounded-lg text-center">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="first_name" className="block text-sm font-semibold mb-2 text-black dark:text-white">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border-2 border-black dark:border-gray-700 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0B5C] dark:focus:ring-[#F09B00] transition text-black dark:text-white text-sm"
              placeholder="First name"
            />
          </div>
          
          <div>
            <label htmlFor="last_name" className="block text-sm font-semibold mb-2 text-black dark:text-white">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border-2 border-black dark:border-gray-700 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0B5C] dark:focus:ring-[#F09B00] transition text-black dark:text-white text-sm"
              placeholder="Last name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2 text-black dark:text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border-2 border-black dark:border-gray-700 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0B5C] dark:focus:ring-[#F09B00] transition text-black dark:text-white"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="customer_type" className="block text-sm font-semibold mb-2 text-black dark:text-white">
            I am a...
          </label>
          <select
            id="customer_type"
            name="customer_type"
            value={selectedType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border-2 border-black dark:border-gray-700 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0B5C] dark:focus:ring-[#F09B00] transition text-black dark:text-white"
          >
            <option value="tourist">Tourist/Visitor</option>
            <option value="non_subscribed_local">Local Resident</option>
          </select>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Note: All new accounts start as Tourist. Local status requires admin approval.
          </p>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold mb-2 text-black dark:text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            minLength={6}
            className="w-full px-3 py-2 border-2 border-black dark:border-gray-700 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0B5C] dark:focus:ring-[#F09B00] transition text-black dark:text-white"
            placeholder="Create a password (min. 6 characters)"
          />
        </div>

        <div>
          <label htmlFor="password_confirmation" className="block text-sm font-semibold mb-2 text-black dark:text-white">
            Confirm Password
          </label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleInputChange}
            required
            minLength={6}
            className="w-full px-3 py-2 border-2 border-black dark:border-gray-700 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0B5C] dark:focus:ring-[#F09B00] transition text-black dark:text-white"
            placeholder="Confirm your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 bg-[#FF0B5C] hover:bg-[#aa4b6b] dark:bg-[#F09B00] dark:hover:bg-[#8f7442] text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <Link href="/login" className="text-[#FF0B5C] dark:text-[#F09B00] hover:underline font-semibold">
          Login here
        </Link>
      </p>
    </div>
  )
}

export default RegisterForm