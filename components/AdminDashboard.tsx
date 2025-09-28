import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

interface Restaurant {
  _id: string
  name: string
  totalVotes: number
  isActive: boolean
  lastVoteDate?: string
}

interface VoteStats {
  totalVotes: number
  totalRestaurants: number
  activeRestaurants: number
  topRestaurant?: Restaurant
}

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`

const StatCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #FF0B5C;
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  color: #7f8c8d;
  font-size: 1rem;
  font-weight: 500;
`

const RestaurantTable = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`

const TableHeader = styled.div`
  background: #f8f9fa;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e9ecef;
  font-weight: 600;
  color: #2c3e50;
`

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e9ecef;
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: #f8f9fa;
  }
`

const RestaurantName = styled.div`
  font-weight: 600;
  color: #2c3e50;
`

const VoteCount = styled.div`
  font-weight: 600;
  color: #FF0B5C;
`

const StatusBadge = styled.span<{ active: boolean }>`
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${props => props.active ? '#d4edda' : '#f8d7da'};
  color: ${props => props.active ? '#155724' : '#721c24'};
`

const LastVoteDate = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
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

const AdminDashboard: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [stats, setStats] = useState<VoteStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch restaurants (this would need to be an admin-only API endpoint)
      const restaurantsResponse = await fetch('/api/admin/restaurants')
      if (!restaurantsResponse.ok) {
        throw new Error('Failed to fetch restaurant data')
      }
      const restaurantsData = await restaurantsResponse.json()
      setRestaurants(restaurantsData)

      // Calculate stats
      const totalVotes = restaurantsData.reduce((sum: number, r: Restaurant) => sum + (r.totalVotes || 0), 0)
      const activeRestaurants = restaurantsData.filter((r: Restaurant) => r.isActive).length
      const topRestaurant = restaurantsData.reduce((top: Restaurant | null, current: Restaurant) => {
        if (!top || (current.totalVotes || 0) > (top.totalVotes || 0)) {
          return current
        }
        return top
      }, null)

      setStats({
        totalVotes,
        totalRestaurants: restaurantsData.length,
        activeRestaurants,
        topRestaurant: topRestaurant || undefined,
      })

    } catch (err) {
      setError('Failed to load dashboard data. Please try again later.')
      console.error('Error fetching dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <DashboardContainer>
        <LoadingSpinner>Loading dashboard...</LoadingSpinner>
      </DashboardContainer>
    )
  }

  if (error) {
    return (
      <DashboardContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </DashboardContainer>
    )
  }

  return (
    <DashboardContainer>
      <Title>Voting System Dashboard</Title>
      
      {stats && (
        <StatsGrid>
          <StatCard>
            <StatNumber>{stats.totalVotes}</StatNumber>
            <StatLabel>Total Votes</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatNumber>{stats.totalRestaurants}</StatNumber>
            <StatLabel>Total Restaurants</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatNumber>{stats.activeRestaurants}</StatNumber>
            <StatLabel>Active Restaurants</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatNumber>{stats.topRestaurant?.totalVotes || 0}</StatNumber>
            <StatLabel>Top Restaurant Votes</StatLabel>
          </StatCard>
        </StatsGrid>
      )}
      
      <RestaurantTable>
        <TableHeader>Restaurant Performance</TableHeader>
        
        <TableRow style={{ background: '#f8f9fa', fontWeight: 600 }}>
          <div>Restaurant Name</div>
          <div>Total Votes</div>
          <div>Status</div>
          <div>Last Vote</div>
        </TableRow>
        
        {restaurants
          .sort((a, b) => (b.totalVotes || 0) - (a.totalVotes || 0))
          .map((restaurant) => (
            <TableRow key={restaurant._id}>
              <RestaurantName>{restaurant.name}</RestaurantName>
              <VoteCount>{restaurant.totalVotes || 0}</VoteCount>
              <StatusBadge active={restaurant.isActive}>
                {restaurant.isActive ? 'Active' : 'Inactive'}
              </StatusBadge>
              <LastVoteDate>{formatDate(restaurant.lastVoteDate)}</LastVoteDate>
            </TableRow>
          ))}
      </RestaurantTable>
      
      {restaurants.length === 0 && (
        <div style={{ textAlign: 'center', color: '#7f8c8d', fontSize: '1.2rem', marginTop: '2rem' }}>
          No restaurants found.
        </div>
      )}
    </DashboardContainer>
  )
}

export default AdminDashboard