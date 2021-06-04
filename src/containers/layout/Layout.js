import { memo } from "react";
import styled from "styled-components";
import { containerStyles } from "../../utils/styles";
import Header from "../header/Header";

const Main = styled.main``;

const Container = styled.div`
  ${containerStyles}
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container>
        <Main>{children}</Main>
      </Container>
    </>
  );
};

export default memo(Layout);
