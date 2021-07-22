import { memo } from "react";
import Link from "next/link";
import styled from "styled-components";
import Logo from "../logo/Logo";
import { mediaQueries } from "../../utils/style";

const StyledLink = styled.a`
  display: flex;
  /* width: 3rem;
  height: 3rem; */
  justify-content: center;
  align-items: center;

  @media screen and (max-width: ${mediaQueries.header}) {
    margin-right: auto;
  }
`;

const LogoLink = () => {
  return (
    <Link href="/" passHref>
      <StyledLink>
        <Logo />
      </StyledLink>
    </Link>
  );
};

export default memo(LogoLink);
