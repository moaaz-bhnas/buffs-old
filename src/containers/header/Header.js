import { memo } from "react";
import styled from "styled-components";
import { containerStyles, offScreen, sizes } from "../../utils/style";

const HeaderContainer = styled.div`
  padding-top: ${sizes.height.header};
`;

const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.bg.header};
  border-bottom: 1px solid ${({ theme }) => theme.border.grey2};

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

const Title = styled.h1`
  ${offScreen}
`;

const Container = styled.div`
  ${containerStyles}
  height: ${sizes.height.header};
  display: flex;
  align-items: center;
  position: relative;
`;

const Header = ({ children }) => {
  return (
    <HeaderContainer>
      <StyledHeader>
        <Title>Buffs</Title>
        <Container>{children}</Container>
      </StyledHeader>
    </HeaderContainer>
  );
};

export default memo(Header);
