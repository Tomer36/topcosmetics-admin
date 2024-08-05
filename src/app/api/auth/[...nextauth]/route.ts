import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login-1',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Username',
          type: 'email',
          placeholder: 'demo@example.com',
          value: 'demo@example.com',
        },
        password: { label: 'Password', type: 'password', value: 'zab#723' },
      },
      async authorize(credentials) {
        const user: User | null = credentials
          ? {
              id: 1,
              name: 'David Tim',
              email: credentials.email,
              accessToken: 'replace-your-token',
              role: 'admin',
            }
          : null;

        if (user) {
          return await new Promise((resolve, reject) => resolve(user));
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
