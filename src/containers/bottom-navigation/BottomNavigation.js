import { memo } from "react";
import styled from "styled-components";
import List from "../../components/bottom-navigation/List";
import { mediaQueries, offScreen } from "../../utils/style";

const Navigation = styled.nav`
  display: none;

  @media screen and (max-width: ${mediaQueries.main}) {
    display: block;
    background-color: #fff;
    border-top: 1px solid ${({ theme }) => theme.border.grey2};

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    .svg {
      fill: ${({ theme }) => theme.bg.dark};
    }
  }
`;

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
