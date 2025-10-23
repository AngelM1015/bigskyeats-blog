import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // Fallback for manual email/password - ALWAYS goes through Rails
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // CRITICAL: Always call Rails server first
        const res = await fetch(`${process.env.RAILS_API_URL}/api/v1/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        })
        
        if (res.ok) {
          const user = await res.json()
          return {
            id: user.user_id,
            email: user.email,
            name: user.name,
            image: user.avatar_url,
            role: user.role,
            status: user.status,
            needs_admin_approval: user.needs_admin_approval,
            access_token: user.access_token,
            refresh_token: user.refresh_token,
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // CRITICAL: For OAuth users, ALWAYS send to Rails server first
      if (user && account && account.provider !== 'credentials') {
        try {
          const response = await fetch(`${process.env.RAILS_API_URL}/api/v1/auth/oauth_callback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              provider: account.provider,
              provider_id: account.providerAccountId,
              avatar_url: user.image,
            }),
          })

          if (response.ok) {
            const railsUser = await response.json()
            // Store Rails JWT tokens in NextAuth token
            token.access_token = railsUser.access_token
            token.refresh_token = railsUser.refresh_token
            token.user_id = railsUser.user_id
            token.role = railsUser.role
            token.status = railsUser.status
            token.needs_admin_approval = railsUser.needs_admin_approval
            token.provider = railsUser.provider
          } else {
            // If Rails server fails, reject the OAuth login
            console.error('Rails OAuth callback failed:', await response.text())
            return null
          }
        } catch (error) {
          console.error('OAuth callback error:', error)
          return null
        }
      }

      // For credentials login, store the tokens directly (already went through Rails)
      if (user && account && account.provider === 'credentials') {
        token.access_token = user.access_token
        token.refresh_token = user.refresh_token
        token.user_id = user.id
        token.role = user.role
        token.status = user.status
        token.needs_admin_approval = user.needs_admin_approval
      }

      return token
    },
    async session({ session, token }) {
      // Add Rails user data to session
      session.user.id = token.user_id
      session.user.role = token.role
      session.user.status = token.status
      session.user.needs_admin_approval = token.needs_admin_approval
      session.user.provider = token.provider
      session.access_token = token.access_token
      session.refresh_token = token.refresh_token
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
})
