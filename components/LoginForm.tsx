import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext,useState } from 'react'

import { AuthContext } from '../contexts/AuthContext'
import { loginUser } from '../lib/auth'

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()
  const { login } = useContext(AuthContext)!

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await loginUser(formData)
      
      if (response.success && response.token && response.user) {
        login(response.token, response.user)
        setSuccess('Login successful! Redirecting...')
        
        setTimeout(() => {
          router.push('/')
        }, 1500)
      } else {
        setError(response.error || 'Login failed')
      }
    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white dark:bg-[#18181B] border-2 border-black dark:border-[#18181B] rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-8 text-black dark:text-white">
        Login to BigSkyEats
      </h2>

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

      <form onSubmit={handleSubmit} className="space-y-6">
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
            className="w-full px-4 py-3 border-2 border-black dark:border-gray-700 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0B5C] dark:focus:ring-[#F09B00] transition text-black dark:text-white"
            placeholder="Enter your email"
          />
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
            className="w-full px-4 py-3 border-2 border-black dark:border-gray-700 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0B5C] dark:focus:ring-[#F09B00] transition text-black dark:text-white"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 bg-[#FF0B5C] hover:bg-[#aa4b6b] dark:bg-[#F09B00] dark:hover:bg-[#8f7442] text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-[#FF0B5C] dark:text-[#F09B00] hover:underline font-semibold">
          Register here
        </Link>
      </p>
    </div>
  )
}