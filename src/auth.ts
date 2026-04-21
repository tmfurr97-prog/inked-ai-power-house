import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';

const googleClientId = process.env.AUTH_GOOGLE_ID;
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET;
const publicRoutes = new Set(['/privacy']);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'database' },
  providers: [
    ...(googleClientId && googleClientSecret
      ? [
          Google({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          }),
        ]
      : []),
    ...(process.env.NODE_ENV === 'development'
      ? [
          Credentials({
            name: 'Local Dev Login',
            credentials: {
              email: { label: 'Email', type: 'email' },
            },
            async authorize(credentials) {
              const email = String(credentials?.email ?? '').trim().toLowerCase();
              if (!email) return null;

              const user = await db.user.upsert({
                where: { email },
                update: {},
                create: {
                  email,
                  name: email.split('@')[0],
                },
              });

              return user;
            },
          }),
        ]
      : []),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      if (publicRoutes.has(nextUrl.pathname)) {
        return true;
      }

      return !!auth;
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
