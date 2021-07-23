import { memo } from "react";
import styled from "styled-components";
import { containerStyles } from "../../utils/style";
import BottomNavigation from "../bottom-navigation/BottomNavigation";
import Header from "../header/Header";

const Main = styled.main`
  padding: 1em 0;
`;

const Container = styled.div`
  ${containerStyles}
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      <Main>
        <Container>{children}</Container>
      </Main>

      <BottomNavigation />
    </>
  );
};

export default memo(Layout);
