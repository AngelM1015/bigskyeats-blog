import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../contexts/AuthContext'
import { canUserVote, getUserTypeDisplay } from '../lib/auth'

interface Restaurant {
  _id: string
  name: string
  slug: { current: string }
  description: string
  cuisine: string[]
  imageUrl?: string
  address: string
  phone?: string
  website?: string
  priceRange: string
  totalVotes: number
  lastVoteDate?: string
}

const VotingContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: 700;
`

const Subtitle = styled.p`
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 3rem;
  font-size: 1.2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`

const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`

const RestaurantCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`

const RestaurantImage = styled.div<{ imageUrl?: string }>`
  height: 200px;
  background: ${props => props.imageUrl 
    ? `url(${props.imageUrl}) center/cover` 
    : 'linear-gradient(135deg, #FF0B5C 0%, #F09B00 100%)'};
  position: relative;
`

const VoteCount = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
`

const CardContent = styled.div`
  padding: 1.5rem;
`

const RestaurantName = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
  font-weight: 600;
`

const CuisineTypes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const CuisineTag = styled.span`
  background: #e8f4f8;
  color: #2980b9;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`

const Description = styled.p`
  color: #7f8c8d;
  margin-bottom: 1rem;
  line-height: 1.5;
  font-size: 0.95rem;
`

const RestaurantInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #7f8c8d;
`

const VoteButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  background: ${props => props.disabled ? '#bdc3c7' : 'linear-gradient(135deg, #FF0B5C 0%, #F09B00 100%)'};
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 11, 92, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: #7f8c8d;
`

const ErrorMessage = styled.div`
  background: #e74c3c;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
`

const SuccessMessage = styled.div`
  background: #27ae60;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
`

const AuthContainer = styled.div`
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  margin-bottom: 2rem;
`

const AuthTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  font-weight: 600;
`

const AuthMessage = styled.p`
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  line-height: 1.5;
`

const AuthButton = styled.button`
  background: linear-gradient(135deg, #FF0B5C 0%, #F09B00 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin: 0 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 11, 92, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`

const UserInfo = styled.div`
  background: #e8f4f8;
  border: 1px solid #2980b9;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 2rem;
  text-align: center;
`

const UserTypeDisplay = styled.span`
  background: #2980b9;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-left: 0.5rem;
`

const VotingSystem: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [votingStates, setVotingStates] = useState<Record<string, boolean>>({})
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const { user, isAuthenticated, isLoading: authLoading } = useContext(AuthContext)!

  useEffect(() => {
    fetchRestaurants()
  }, [])

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('/api/restaurants')
      if (!response.ok) {
        throw new Error('Failed to fetch restaurants')
      }
      const data = await response.json()
      setRestaurants(data)
    } catch (err) {
      setError('Failed to load restaurants. Please try again later.')
      console.error('Error fetching restaurants:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (restaurantId: string) => {
    if (!isAuthenticated || !user) {
      setMessage({ type: 'error', text: 'Please log in to vote' })
      return
    }

    if (!canUserVote(user)) {
      setMessage({ 
        type: 'error', 
        text: 'Only local customers (non-subscribed local and above) can vote. Please upgrade your account to participate in voting.' 
      })
      return
    }

    setVotingStates(prev => ({ ...prev, [restaurantId]: true }))
    setMessage(null)
    
    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('bigskyeats_token')}`,
        },
        body: JSON.stringify({
          restaurantId,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit vote')
      }
      
      setMessage({ type: 'success', text: data.message })
      
      // Refresh restaurants to get updated vote counts
      await fetchRestaurants()
      
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
      console.error('Error voting:', err)
    } finally {
      setVotingStates(prev => ({ ...prev, [restaurantId]: false }))
    }
  }

  if (authLoading || loading) {
    return (
      <VotingContainer>
        <LoadingSpinner>Loading...</LoadingSpinner>
      </VotingContainer>
    )
  }

  if (error) {
    return (
      <VotingContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </VotingContainer>
    )
  }

  // Show authentication prompt if user is not logged in
  if (!isAuthenticated) {
    return (
      <VotingContainer>
        <Title>Big Sky Community Choice Awards</Title>
        <Subtitle>
          Vote for your favorite local restaurants and help support our community through the Big Sky Community Dividend program.
        </Subtitle>
        
        <AuthContainer>
          <AuthTitle>Login Required</AuthTitle>
          <AuthMessage>
            You must be logged in as a local customer to participate in voting. 
            Only non-subscribed local customers and above can vote for restaurants.
          </AuthMessage>
          <AuthButton onClick={() => window.location.href = '/login'}>
            Login
          </AuthButton>
          <AuthButton onClick={() => window.location.href = '/register?source=voting'}>
            Register
          </AuthButton>
        </AuthContainer>
      </VotingContainer>
    )
  }

  // Show user info and voting eligibility
  const userCanVote = canUserVote(user!)
  
  return (
    <VotingContainer>
      <Title>Big Sky Community Choice Awards</Title>
      <Subtitle>
        Vote for your favorite local restaurants and help support our community through the Big Sky Community Dividend program. 
        Your votes help determine how community profits are shared with local businesses.
      </Subtitle>
      
      <UserInfo>
        <div>
          Welcome, {user!.email}
          <UserTypeDisplay>{getUserTypeDisplay(user!.customer_type)}</UserTypeDisplay>
        </div>
        {!userCanVote && (
          <div style={{ marginTop: '0.5rem', color: '#e74c3c', fontWeight: '500' }}>
            Only local customers (non-subscribed local and above) can vote. Please upgrade your account to participate.
          </div>
        )}
      </UserInfo>
      
      {message && (
        message.type === 'success' ? (
          <SuccessMessage>{message.text}</SuccessMessage>
        ) : (
          <ErrorMessage>{message.text}</ErrorMessage>
        )
      )}
      
      <RestaurantGrid>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant._id}>
            <RestaurantImage imageUrl={restaurant.imageUrl}>
              <VoteCount>{restaurant.totalVotes || 0} votes</VoteCount>
            </RestaurantImage>
            
            <CardContent>
              <RestaurantName>{restaurant.name}</RestaurantName>
              
              {restaurant.cuisine && restaurant.cuisine.length > 0 && (
                <CuisineTypes>
                  {restaurant.cuisine.map((type, index) => (
                    <CuisineTag key={index}>{type}</CuisineTag>
                  ))}
                </CuisineTypes>
              )}
              
              {restaurant.description && (
                <Description>{restaurant.description}</Description>
              )}
              
              <RestaurantInfo>
                <span>{restaurant.priceRange}</span>
                {restaurant.address && <span>{restaurant.address}</span>}
              </RestaurantInfo>
              
              <VoteButton
                onClick={() => handleVote(restaurant._id)}
                disabled={votingStates[restaurant._id] || !userCanVote}
              >
                {votingStates[restaurant._id] 
                  ? 'Voting...' 
                  : !userCanVote 
                    ? 'Upgrade Account to Vote'
                    : 'Vote for this Restaurant'
                }
              </VoteButton>
            </CardContent>
          </RestaurantCard>
        ))}
      </RestaurantGrid>
      
      {restaurants.length === 0 && (
        <div style={{ textAlign: 'center', color: '#7f8c8d', fontSize: '1.2rem' }}>
          No restaurants available for voting at this time.
        </div>
      )}
    </VotingContainer>
  )
}

export default VotingSystem