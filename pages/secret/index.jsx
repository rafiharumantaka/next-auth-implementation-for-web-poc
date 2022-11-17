import { getCsrfToken, getProviders, getSession, signOut, useSession } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';

function SecretPage() {
  const { status, data } = useSession();
  const router = useRouter();

  console.log({status, data});

  const callGetSessionAndPrintResult = async () => {
    const token = await getCsrfToken();
    const session = await getSession();
    const providers = await getProviders();
    console.log('token', token);
    console.log('session', session);
    console.log('providers', providers);
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/signin');
    }
  }, [status]);

  if (status === 'loading') {
    return <h6>Page is loading</h6>;
  }

  return (
    <div>
      <h1>secret page with your data</h1>
      <h3>only available for you that logged in</h3>
      <div style={{ marginTop: '8px' }}>
        <pre>{JSON.stringify({ status, data })}</pre>
      </div>
      <div style={{ marginTop: '16px' }}>
        <button onClick={() => {signOut({ callbackUrl: 'https://google.com' })}}>Sign out</button>
      </div>
      <div style={{ marginTop: '16px' }}>
        <button onClick={() => { callGetSessionAndPrintResult() }}>Print session data</button>
      </div>
    </div>
  );
}

export default SecretPage;
