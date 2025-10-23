import { useState, useEffect } from 'react'

interface GoogleFormsConfig {
  formId: string
  emailEntryId: string
  nameEntryId?: string
}

interface UseGoogleFormsReturn {
  email: string
  isGoogleSignedIn: boolean
  submitToGoogleForms: (data: Record<string, string>) => Promise<boolean>
}

export const useGoogleForms = (config: GoogleFormsConfig): UseGoogleFormsReturn => {
  const [email, setEmail] = useState('')
  const [isGoogleSignedIn, setIsGoogleSignedIn] = useState(false)

  useEffect(() => {
    // Check if user is signed into Google and get email
    const checkGoogleSignIn = async () => {
      try {
        // This would work if you implement Google Sign-In
        // For now, we'll detect if they're on a Google-signed-in browser
        const isSignedIn = document.cookie.includes('SAPISID') || 
                          document.cookie.includes('__Secure-3PSID')
        
        setIsGoogleSignedIn(isSignedIn)
        
        // Try to extract email from common Google cookie patterns
        // This is a simplified approach - real implementation would use Google APIs
        if (isSignedIn) {
          // Check for email in localStorage or cookies (browser-dependent)
          const storedEmail = localStorage.getItem('google_email') || 
                             document.cookie.match(/email=([^;]+)/)?.[1]
          
          if (storedEmail) {
            setEmail(decodeURIComponent(storedEmail))
          }
        }
      } catch (error) {
        console.log('Google sign-in detection failed:', error)
      }
    }

    checkGoogleSignIn()
  }, [])

  const submitToGoogleForms = async (data: Record<string, string>): Promise<boolean> => {
    try {
      const formData = new FormData()
      
      // Add email
      if (data.email) {
        formData.append(config.emailEntryId, data.email)
      }
      
      // Add name if provided
      if (data.name && config.nameEntryId) {
        formData.append(config.nameEntryId, data.name)
      }

      // Submit to Google Forms
      const response = await fetch(
        `https://docs.google.com/forms/d/e/${config.formId}/formResponse`,
        {
          method: 'POST',
          mode: 'no-cors', // Required for Google Forms
          body: formData,
        }
      )

      return true // Google Forms doesn't return response in no-cors mode
    } catch (error) {
      console.error('Failed to submit to Google Forms:', error)
      return false
    }
  }

  return {
    email,
    isGoogleSignedIn,
    submitToGoogleForms,
  }
}
