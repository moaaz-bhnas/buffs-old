import { memo } from "react";
import styled from "styled-components";
import { mediaQueries, rawList } from "../../utils/style";
import Item from "../../components/social-list/Item";
import FilledPaperPlane from "../../components/svgs/FilledPaperPlane";
import EmptyPaperPlane from "../../components/svgs/EmptyPaperPlane";
import FilledHeart from "../../components/svgs/FilledHeart";
import EmptyHeart from "../../components/svgs/EmptyHeart";
import Avatar from "../../containers/header-avatar/HeaderAvatar";

const List = styled.ul`
  ${rawList}

  display: flex;

  .svg {
    fill: ${({ theme }) => theme.bg.dark};
  }

  @media screen and (max-width: ${mediaQueries.main}) {
    display: none;
  }
`;

const list = [
  {
    ActiveIcon: FilledPaperPlane,
    InactiveIcon: EmptyPaperPlane,
    name: "inbox",
  },
  { ActiveIcon: FilledHeart, InactiveIcon: EmptyHeart, name: "notifications" },
  { ActiveIcon: Avatar, InactiveIcon: Avatar, name: "account" },
];

const SocialList = () => {
  return (
    <List>
      {list.map((item) => (
        <Item key={item.name} item={item} />
      ))}
    </List>
  );
};
export default memo(SocialList);
