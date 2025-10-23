import React, { useState, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

interface FallbackAuthProps {
  onSuccess?: (user: any) => void
  onError?: (error: string) => void
}

export function FallbackAuth({ onSuccess, onError }: FallbackAuthProps) {
  const { data: session, status } = useSession()
  const [isManualMode, setIsManualMode] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Auto-detect if user is signed into Google
  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleCallback,
        auto_select: false,
      })
    }
  }, [])

  const handleGoogleCallback = async (response: any) => {
    setIsLoading(true)
    setError('')
    
    try {
      // Always go through Rails server first
      const railsResponse = await fetch(`${process.env.NEXT_PUBLIC_RAILS_API_URL}/api/v1/auth/oauth_callback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: response.email,
          name: response.name,
          provider: 'google',
          provider_id: response.sub,
          avatar_url: response.picture,
        }),
      })

      if (railsResponse.ok) {
        const userData = await railsResponse.json()
        onSuccess?.(userData)
      } else {
        const errorData = await railsResponse.json()
        setError(errorData.error || 'Authentication failed')
        onError?.(errorData.error || 'Authentication failed')
      }
    } catch (err) {
      const errorMessage = 'Network error. Please try again.'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Always go through Rails server first
      const response = await fetch(`${process.env.NEXT_PUBLIC_RAILS_API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const userData = await response.json()
        onSuccess?.(userData)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Login failed')
        onError?.(errorData.error || 'Login failed')
      }
    } catch (err) {
      const errorMessage = 'Network error. Please try again.'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.prompt((notification: any) => {
        console.log('Google prompt notification:', notification)
      })
    } else {
      // Fallback to NextAuth if Google API not available
      signIn('google', { callbackUrl: '/' })
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    )
  }

  if (session) {
    return (
      <div className="flex flex-col items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="text-center">
          <h3 className="font-semibold text-green-800">Welcome back!</h3>
          <p className="text-sm text-gray-600">
            Signed in as <strong>{session.user?.email}</strong>
          </p>
        </div>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign out
        </button>
      </div>
    )
  }

  if (isManualMode) {
    return (
      <div className="flex flex-col gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="text-center">
          <h3 className="font-semibold text-gray-800">Manual Login</h3>
          <p className="text-sm text-gray-600">Enter your credentials</p>
        </div>
        
        <form onSubmit={handleManualLogin} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded"
            required
          />
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <button
          onClick={() => setIsManualMode(false)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to OAuth options
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="flex items-center gap-3 bg-white border-2 border-gray-300 rounded-lg px-6 py-3 hover:shadow-lg transition-all disabled:opacity-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <span className="font-semibold text-gray-700">
          {isLoading ? 'Signing in...' : 'Sign in with Google'}
        </span>
      </button>

      <button
        onClick={() => signIn('github', { callbackUrl: '/' })}
        disabled={isLoading}
        className="flex items-center gap-3 bg-gray-900 text-white rounded-lg px-6 py-3 hover:bg-gray-800 transition-all disabled:opacity-50"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <span className="font-semibold">
          {isLoading ? 'Signing in...' : 'Sign in with GitHub'}
        </span>
      </button>

      <div className="text-center">
        <button
          onClick={() => setIsManualMode(true)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Or sign in manually
        </button>
      </div>
    </div>
  )
}
