import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

function Home() {
  const router = useRouter();

  return (
    <div>
      {/* <button onClick={() => signIn()} type='button'>Sign in Next authPage</button> */}
      <button onClick={() => {
        router.push('/signin');
      }} type='button'>Sign in Next authPage</button>
    </div>
  );
}

export default Home;
