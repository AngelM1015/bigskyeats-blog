import AdminDashboard from 'components/AdminDashboard'
import Layout from 'components/Layout'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const LoginTitle = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 700;
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Input = styled.input`
  padding: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #FF0B5C;
  }
`

const LoginButton = styled.button`
  background: linear-gradient(135deg, #FF0B5C 0%, #F09B00 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const ErrorMessage = styled.div`
  background: #e74c3c;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
`

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminKey, setAdminKey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Test the admin key by making a request to the admin API
      const response = await fetch(`/api/admin/restaurants?adminKey=${encodeURIComponent(adminKey)}`)
      
      if (response.ok) {
        setIsAuthenticated(true)
        // Store admin key in session storage for subsequent requests
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('adminKey', adminKey)
        }
      } else {
        setError('Invalid admin key. Please try again.')
      }
    } catch (err) {
      setError('Failed to authenticate. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Check if already authenticated on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedKey = sessionStorage.getItem('adminKey')
      if (storedKey) {
        setAdminKey(storedKey)
        setIsAuthenticated(true)
      }
    }
  }, [])

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Admin Dashboard - Big Sky Eats</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        
        <Layout>
          <LoginContainer>
            <LoginTitle>Admin Login</LoginTitle>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <LoginForm onSubmit={handleLogin}>
              <Input
                type="password"
                placeholder="Enter admin key"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                required
              />
              <LoginButton type="submit" disabled={loading}>
                {loading ? 'Authenticating...' : 'Login'}
              </LoginButton>
            </LoginForm>
          </LoginContainer>
        </Layout>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Big Sky Eats</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <Layout>
        <AdminDashboard />
      </Layout>
    </>
  )
}