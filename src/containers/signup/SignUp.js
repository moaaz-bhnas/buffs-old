import { memo } from "react";
import styled from "styled-components";
import { TwitterButton } from "../../components/button/Button";
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

const SignUp = ({ providers }) => {
  return (
    <Form>
      <Title>Sign up to Buffs</Title>
      {Object.values(providers).map((provider) => (
        <TwitterButton key={provider.id} onClick={() => signIn(provider.id)}>
          Continue with Twitter
        </TwitterButton>
      ))}
    </Form>
  );
};

SignUp.propTypes = {
  providers: PropTypes.object,
};

export default memo(SignUp);
