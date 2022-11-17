import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';

export const authOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60,
  },
  providers: [
    Credentials({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        // No need if you are using your own login page
        // email: { label: 'Email', type: 'email' },
        // password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, req) => {
        const { email, password } = credentials;
        const user = req;
        try {
          if (email !== 'john@john.com' && password !== '12345678') {
            throw Error('Invalid Credentials');
          }

          // Call Login API here with credentials

          return { id: 'USER01', name: 'John Doe', email: 'john@john.com', token: 'THISISTHEAUTHTOKEN' };
        } catch (err) {
          console.log('err nih', err);
          throw (err);
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  /**This is for setting the custom cookies key name, and must contain these 3 items
   * - sessionToken
   * - callbackUrl
   * - csrfToken
   * or it won't work */
  cookies: {
    sessionToken: {
      name: "POC.session-token",
      options: {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: true
      },
    },
    callbackUrl: {
      name: `POC.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    },
    csrfToken: {
      name: `POC.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    },
  },
};

export default NextAuth(authOptions);
