import { memo } from "react";
import styled from "styled-components";
import LogoLink from "../../components/header/LogoLink";
import { containerStyles } from "../../utils/styles";

const StyledHeader = styled.header``;

const Container = styled.div`
  ${containerStyles}
`;

const Header = () => {
  return (
    <StyledHeader>
      <Container>
        <LogoLink />
      </Container>
    </StyledHeader>
  );
};

export default memo(Header);
