import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
/**
 * react-auth-kit doesn't work with nextjs,
 * because it requires 'window' object that only exist in browser
 */
// import { AuthProvider } from 'react-auth-kit';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    // console.log('window', window);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // return (
  //   <Component {...pageProps} />
  // );
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
