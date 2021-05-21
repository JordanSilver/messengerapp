import { Button } from '@material-ui/core';
import Head from 'next/head';
import styled from 'styled-components';
import { auth, provider } from '../firebase';
import { MdWhatshot } from 'react-icons/md';

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <MdWhatshot size='190' color='crimson' />
        <Button onClick={signIn} color='inherit' variant='outlined'>
          Sign in with Google
        </Button>
      </LoginContainer>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background: linear-gradient(
    0deg,
    rgba(253, 41, 41, 1) 0%,
    rgba(155, 10, 10, 1) 29%,
    rgba(151, 9, 9, 1) 40%,
    rgba(135, 8, 8, 1) 45%,
    rgba(150, 9, 9, 1) 50%,
    rgba(154, 10, 10, 1) 55%,
    rgba(253, 41, 41, 1) 98%
  );
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: -50px 50px 50px rgba(0, 0, 0, 0.5);
  border-top: 1px solid rgba(0, 0, 0, 0.4);
  border-right: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 15px;
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;
