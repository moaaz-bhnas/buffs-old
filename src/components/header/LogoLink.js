import { memo } from "react";
import Link from "next/link";
import styled from "styled-components";
import Logo from "../logo/Logo";

const StyledLink = styled.a`
  margin-right: 0.5em;
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
