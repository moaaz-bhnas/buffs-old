import { memo } from "react";
import styled from "styled-components";
import Link from "next/link";
import { linkStyles, mediaQueries, rawButton, sizes } from "../../utils/style";
import { useSession, signOut } from "next-auth/client";

const StyledAuth = styled.p`
  margin: 0;
  margin-right: 1em;
  flex-shrink: 0;

  @media screen and (max-width: ${mediaQueries.header}) {
    display: none;
  }
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

const SignOutButton = styled.button`
  ${rawButton}
  ${linkStyles}
  padding: .75em .5em;
  border-radius: ${sizes.borderRadius.default};
`;

const Auth = () => {
  const [session, loading] = useSession();

  return (
    <StyledAuth>
      {session ? (
        <SignOutButton onClick={signOut}>Sign out</SignOutButton>
      ) : (
        <>
          <Link passHref href="/signin">
            <SignInLink>Log in</SignInLink>
          </Link>{" "}
          <Link passHref href="/signup">
            <StyledLink>Create account</StyledLink>
          </Link>
        </>
      )}
    </StyledAuth>
  );
};

export default memo(Auth);
