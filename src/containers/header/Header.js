import { memo } from "react";
import styled from "styled-components";
import LogoLink from "../../components/header/LogoLink";
import { containerStyles, offScreen, sizes } from "../../utils/style";
import Search from "../search/Search";

const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.bg.header};
  border-bottom: 1px solid ${({ theme }) => theme.bg.grey2};
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
  return (
    <StyledHeader>
      <Title>Buffs</Title>
      <Navigation>
        <LogoLink />
        <Search />
      </Navigation>
    </StyledHeader>
  );
};

export default memo(Header);
