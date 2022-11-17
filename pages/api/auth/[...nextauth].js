import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';
import { axiosNoAuth } from '../../../helpers/custom-axios';

export const authOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
  },
  callbacks: {
    session: async ({ session, token, user }) => {
      if (session?.user) {
        session.user.admin_id = token.admin_id;
        session.user.token = token.token;
      }
      console.log('callback session', session.user);
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.admin_id = user.admin_id;
        token.token = user.token;
      }
      return token;
    },
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
          // if (email !== 'john@john.com' && password !== '12345678') {
          //   throw Error('Invalid Credentials');
          // }

          // Call Login API here with credentials
          // Test with awp portal dev login
          let query = {
            email: email,
            password: password,
          };

          const responseData = await axiosNoAuth.post(
            'account/api/adminLogin',
            JSON.stringify(query),
          );

          // console.log('SUCCESS', responseData.data.result);
          const result = responseData.data.result;

          return { admin_id: result.admin_id, name: result.name, email: result.email, token: result.token };
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
