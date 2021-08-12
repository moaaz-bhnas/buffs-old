import { useSession } from "next-auth/client";
import { memo } from "react";
import styled from "styled-components";
import Header from "../Header";
import Auth from "../../../components/header/Auth";
import LogoLink from "../../../components/header/LogoLink";
import SocialList from "../../social-list/SocialList";
import { offScreen } from "../../../utils/style";
import Search from "../../search/Search";
import SocialListMobile from "../../social-list-mobile/SocialListMobile";

const Navigation = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavTitle = styled.h2`
  ${offScreen}
`;

const Default = () => {
  const [session] = useSession();

  return (
    <Header>
      <Navigation>
        <NavTitle>Main Navigation</NavTitle>
        <LogoLink />
        <Search />
        {session ? (
          <>
            <SocialList />
            <SocialListMobile />
          </>
        ) : (
          <Auth />
        )}
      </Navigation>
    </Header>
  );
};

export default memo(Default);
