import { useEffect, useState } from 'react'
import { CheckCircle, Mail } from 'lucide-react'

interface GoogleAutoDetectSignupProps {
  userType: string
  userLabel: string
  onSuccess?: () => void
}

export const GoogleAutoDetectSignup = ({ 
  userType, 
  userLabel,
  onSuccess 
}: GoogleAutoDetectSignupProps) => {
  const [googleEmail, setGoogleEmail] = useState<string | null>(null)
  const [isGoogleSignedIn, setIsGoogleSignedIn] = useState(false)
  const [manualEmail, setManualEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    console.log('🔍 GoogleAutoDetectSignup: Starting detection for', userType)
    
    // Detect if user is signed into Google
    const detectGoogleSignIn = async () => {
      try {
        // Method 1: Check for Google cookies (most reliable)
        const hasGoogleCookies = 
          document.cookie.includes('SAPISID') || 
          document.cookie.includes('__Secure-3PSID') ||
          document.cookie.includes('SSID')

        console.log('🍪 Google cookies detected:', hasGoogleCookies)

        if (hasGoogleCookies) {
          setIsGoogleSignedIn(true)
          
          // Try to extract email from various sources
          const storedEmail = 
            localStorage.getItem('google_email') ||
            sessionStorage.getItem('google_email')
          
          if (storedEmail) {
            setGoogleEmail(decodeURIComponent(storedEmail))
            console.log('📧 Found stored email:', storedEmail)
          }
        }

        // Method 2: Try Google Identity Services (if available)
        if (window.google?.accounts) {
          console.log('🔧 Google Identity Services available')
          window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
            callback: handleGoogleResponse,
            auto_select: true,
            cancel_on_tap_outside: false,
          })

          // Attempt to get user info without prompting
          window.google.accounts.id.prompt((notification: any) => {
            console.log('🔔 Google prompt notification:', notification)
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
              // User is signed in but dismissed or already registered
              setIsGoogleSignedIn(true)
            }
          })
        } else {
          console.log('❌ Google Identity Services not available')
        }
      } catch (error) {
        console.log('⚠️ Google sign-in detection error:', error)
        // Fallback to manual entry
        setIsGoogleSignedIn(false)
      }
    }

    detectGoogleSignIn()
  }, [])

  const handleGoogleResponse = (response: any) => {
    try {
      // Decode JWT token to get email
      const token = response.credential
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      const userData = JSON.parse(jsonPayload)
      
      if (userData.email) {
        setGoogleEmail(userData.email)
        setIsGoogleSignedIn(true)
        // Store for future use
        localStorage.setItem('google_email', userData.email)
      }
    } catch (error) {
      console.error('Failed to decode Google token:', error)
    }
  }

  const handleGoogleSignup = async () => {
    setIsSubmitting(true)
    setError('')

    try {
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? 'https://bigskyeats.app/api/v1/email_registrations'
        : 'http://localhost:3000/api/v1/email_registrations'

      // Use detected email or fallback to a placeholder that indicates Google signup
      const emailToUse = googleEmail || `google_signup_${userType}_${Date.now()}@bigskyeats.temp`

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_registration: {
            email: emailToUse,
            user_type: userType,
            source: 'blog_carousel_google_auto',
            status: 'pending_approval',
          },
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        if (onSuccess) onSuccess()
      } else {
        setError('Unable to submit. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleManualSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
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
            email: manualEmail,
            user_type: userType,
            source: 'blog_carousel_manual',
            status: 'pending_approval',
          },
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setManualEmail('')
        if (onSuccess) onSuccess()
      } else {
        setError('Unable to submit. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-4">
        <CheckCircle className="w-10 h-10 text-green-500 dark:text-green-400" />
        <p className="text-green-600 dark:text-green-400 text-center font-semibold">
          ✅ Thank you! Your registration has been submitted for admin approval.
        </p>
      </div>
    )
  }

  // Google One-Click Signup (if signed in)
  if (isGoogleSignedIn && googleEmail) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Detected Google account:
          </p>
          <p className="font-semibold text-gray-900 dark:text-white mb-4">
            {googleEmail}
          </p>
        </div>
        
        <button
          onClick={handleGoogleSignup}
          disabled={isSubmitting}
          className="flex items-center gap-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg px-6 py-3 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed relative z-20"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            {isSubmitting ? 'Signing up...' : `Sign up as ${userLabel} with Google`}
          </span>
        </button>

        <button
          onClick={() => setIsGoogleSignedIn(false)}
          className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
        >
          Use a different email
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}
      </div>
    )
  }

  // Always show Google-style button (even if not detected)
  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleGoogleSignup}
        disabled={isSubmitting}
        className="flex items-center gap-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg px-6 py-3 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed relative z-20"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <span className="font-semibold text-gray-700 dark:text-gray-300">
          {isSubmitting ? 'Signing up...' : `Sign up as ${userLabel} with Google`}
        </span>
      </button>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        One-click signup • Uses your Google account
      </p>

      {error && (
        <p className="text-red-500 text-sm text-center mt-2">{error}</p>
      )}
    </div>
  )
}

// Extend Window type for Google Identity Services
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void
          prompt: (callback: (notification: any) => void) => void
        }
      }
    }
  }
}
