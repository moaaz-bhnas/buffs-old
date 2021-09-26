import { signOut, useSession } from "next-auth/client";
import { memo } from "react";
import styled from "styled-components";
import { containerStyles } from "../../utils/style";
import BottomNavigation from "../bottom-navigation/BottomNavigation";
import DefaultHeader from "../header/containers/Default";
import ReturnableHeader from "../header/containers/Returnable";

const Main = styled.main`
  padding: 1em 0;
`;

const Container = styled.div`
  ${containerStyles}
`;

const Layout = ({ children, returnable = false, returnableTitle = "" }) => {
  const [session] = useSession();

  return (
    <>
      {returnable ? (
        <ReturnableHeader title={returnableTitle} />
      ) : (
        <DefaultHeader />
      )}

      <Main>
        <Container>{children}</Container>
      </Main>

      {session && <BottomNavigation />}
    </>
  );
};

export default memo(Layout);
