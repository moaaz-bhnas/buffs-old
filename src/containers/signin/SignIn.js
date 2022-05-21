import { memo } from "react";
import styled from "styled-components";
import { TwitterButton, GoogleButton } from "../../components/button/Button";
import PropTypes from "prop-types";
import { signIn } from "next-auth/client";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
`;

const SignIn = ({ providers }) => {
  console.log("providers: ", providers);

  const twitterProvider = providers.twitter;
  const googleProvider = providers.google;

  return (
    <Form>
      <Title>Log in to Buffs</Title>
      <GoogleButton
        key={googleProvider.id}
        onClick={() => signIn(googleProvider.id)}
      >
        Continue with {googleProvider.name}
      </GoogleButton>
      <TwitterButton
        key={twitterProvider.id}
        onClick={() => signIn(twitterProvider.id)}
      >
        Continue with {twitterProvider.name}
      </TwitterButton>
    </Form>
  );
};

SignIn.propTypes = {
  providers: PropTypes.object,
};

export default memo(SignIn);
