import { memo } from "react";
import styled from "styled-components";
import List from "../../components/bottom-navigation/List";
import { offScreen } from "../../utils/style";

const Navigation = styled.nav``;

const Title = styled.h2`
  ${offScreen}
`;

const BottomNavigation = () => {
  return (
    <Navigation>
      <Title>Bottom Navigation</Title>
      <List />
    </Navigation>
  );
};

export default memo(BottomNavigation);
