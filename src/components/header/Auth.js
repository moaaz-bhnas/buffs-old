import { memo } from "react";
import styled from "styled-components";
import Link from "next/link";
import { linkStyles, rawButton, sizes } from "../../utils/style";

const StyledAuth = styled.p`
  margin: 0;
  flex-shrink: 0;
`;

const StyledLink = styled.a`
  ${linkStyles}
  padding: .75em .5em;
  border-radius: ${sizes.borderRadius.default};
`;

const SignInLink = styled(StyledLink)`
  color: #fff;
  background-color: ${({ theme }) => theme.bg.dark};
`;

const Auth = () => {
  return (
    <StyledAuth>
      <Link passHref href="/signin">
        <SignInLink>Log in</SignInLink>
      </Link>{" "}
      <Link passHref href="/signup">
        <StyledLink>Create account</StyledLink>
      </Link>
    </StyledAuth>
  );
};

export default memo(Auth);
