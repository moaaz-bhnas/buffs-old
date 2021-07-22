import { useSession } from "next-auth/client";
import { memo } from "react";
import styled from "styled-components";
import Auth from "../../components/header/Auth";
import LogoLink from "../../components/header/LogoLink";
import SocialList from "../social-list/SocialList";
import { containerStyles, offScreen, sizes } from "../../utils/style";
import Search from "../search/Search";

const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.bg.header};
  border-bottom: 1px solid ${({ theme }) => theme.border.grey2};

  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  ${offScreen}
`;

const Navigation = styled.nav`
  ${containerStyles};
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${sizes.height.header};
  position: relative;
`;

const NavTitle = styled.h2`
  ${offScreen}
`;

const Header = () => {
  const [session, loading] = useSession();

  return (
    <StyledHeader>
      <Title>Buffs</Title>
      <Navigation>
        <NavTitle>Main Navigation</NavTitle>
        <LogoLink />
        <Search />
        {session ? <SocialList /> : <Auth />}
      </Navigation>
    </StyledHeader>
  );
};

export default memo(Header);
