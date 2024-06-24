import NextAuth from 'next-auth/next'
import { compare } from 'bcrypt'
import CredentialsProvider from 'next-auth/providers/credentials'
import type { AuthOptions, User } from 'next-auth'

import prisma from '@/app/lib/prisma'

const config: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials): Promise<User | null> {
        const matchUser = await prisma.user.findFirst({
          where: { email: credentials?.email },
        })

        if (!matchUser) {
          return null
        }

        const comparePassword = await compare(
          credentials?.password || '',
          matchUser.password
        )

        if (comparePassword) {
          return {
            id: matchUser.user_id.toString(),
            email: matchUser.email,
          }
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
}

const handler = NextAuth(config)

export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
