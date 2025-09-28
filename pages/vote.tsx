import Layout from 'components/Layout'
import VotingSystem from 'components/VotingSystem'
import { getClient } from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { groq } from 'next-sanity'
import { useContext, useEffect } from 'react'
import styled from 'styled-components'

import { AuthContext } from '../contexts/AuthContext'

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #FF0B5C 0%, #F09B00 100%);
  padding: 0;
`

interface VotePageProps {
  settings: any
}

export default function VotePage({ settings }: VotePageProps) {
  const { isAuthenticated, isLoading } = useContext(AuthContext)!
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/vote')
    }
  }, [isAuthenticated, isLoading, router])

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <PageContainer>
        <Layout>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh',
            color: 'white',
            fontSize: '1.2rem'
          }}>
            Loading...
          </div>
        </Layout>
      </PageContainer>
    )
  }

  // Don't render the voting system if not authenticated (redirect will happen)
  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <Head>
        <title>Community Choice Awards - Big Sky Eats</title>
        <meta 
          name="description" 
          content="Vote for your favorite Big Sky restaurants and support local businesses through our Community Dividend program." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Community Choice Awards - Big Sky Eats" />
        <meta 
          property="og:description" 
          content="Vote for your favorite Big Sky restaurants and support local businesses through our Community Dividend program." 
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Community Choice Awards - Big Sky Eats" />
        <meta 
          name="twitter:description" 
          content="Vote for your favorite Big Sky restaurants and support local businesses through our Community Dividend program." 
        />
      </Head>
      
      <PageContainer>
        <Layout>
          <VotingSystem />
        </Layout>
      </PageContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const client = getClient()
  
  const settings = await client.fetch(
    groq`*[_type == "settings"][0]{
      title,
      description,
      ogImage
    }`
  )

  return {
    props: {
      settings: settings || {},
    },
    revalidate: 60, // Revalidate every minute
  }
}