import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function SignInPage() {
  const { status } = useSession();
  const router = useRouter();

  const [postData, setPostData] = useState({
    email: '',
    password: '',
  });

  const formOnChangeHandler = (e) => {
    setPostData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const response = await signIn('credentials', {
      email: postData.email,
      password: postData.password,
      redirect: false,
    });

    console.log(response);
    if (response.status === 200) {
      router.push('/secret');
    }
  };

  useEffect(() => {
    console.log('status', status)
    if (status === "authenticated") {
      router.replace('/secret');
    }
  }, [status]);

  return (
    <div>
      <h1>Login</h1>
      <div>
        <form onSubmit={submitFormHandler}>
          <input
            name="email"
            type="email"
            value={postData.email}
            onChange={formOnChangeHandler}
          />
          <input
            name="password"
            type="password"
            value={postData.password}
            onChange={formOnChangeHandler}
          />
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
