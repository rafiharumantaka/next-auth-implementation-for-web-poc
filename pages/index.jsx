import { signIn, signOut } from 'next-auth/react';

function Home() {
  return (
    <div>
      <button onClick={() => signIn()} type='button'>Sign in Next authPage</button>
    </div>
  );
}

export default Home;
