import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'

import RegisterForm from '../components/RegisterForm'

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #FF0B5C 0%, #F09B00 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 600px;
`

const BackLink = styled.a`
  display: inline-block;
  color: white;
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 600;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:before {
    content: '← ';
  }
`

const RegisterPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Register - Big Sky Eats</title>
        <meta name="description" content="Create your Big Sky Eats account to participate in community voting and support local restaurants" />
      </Head>
      
      <PageContainer>
        <ContentWrapper>
          <BackLink href="/">Back to Home</BackLink>
          <RegisterForm />
        </ContentWrapper>
      </PageContainer>
    </>
  )
}

export default RegisterPage