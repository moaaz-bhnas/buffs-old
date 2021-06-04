import { memo } from "react";
import styled from "styled-components";
import { containerStyles } from "../../utils/style";
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
    </>
  );
};

export default memo(Layout);
