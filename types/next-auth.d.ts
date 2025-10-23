import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    role: string
    status: string
    needs_admin_approval: boolean
    provider?: string
    access_token?: string
    refresh_token?: string
  }

  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: string
      status: string
      needs_admin_approval: boolean
      provider?: string
    }
    access_token?: string
    refresh_token?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user_id: string
    role: string
    status: string
    needs_admin_approval: boolean
    provider?: string
    access_token?: string
    refresh_token?: string
  }
}
