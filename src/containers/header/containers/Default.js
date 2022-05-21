import { useSession, signOut } from "next-auth/client";
import { memo } from "react";
import styled from "styled-components";
import Header from "../Header";
import Auth from "../../../components/header/Auth";
import LogoLink from "../../../components/header/LogoLink";
import SocialList from "../../social-list/SocialList";
import { offScreen, rawButton, sizes } from "../../../utils/style";
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

const Button = styled.button`
  ${rawButton}

  text-decoration: underline;
  padding: 0.4rem 0.5rem;
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
            <Button onClick={signOut}>Log out</Button>
          </>
        ) : (
          <Auth />
        )}
      </Navigation>
    </Header>
  );
};

export default memo(Default);
