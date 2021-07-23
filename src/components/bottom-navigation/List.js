import { memo } from "react";
import styled from "styled-components";
import { rawList } from "../../utils/style";
import FilledHome from "../svgs/FilledHome";
import EmptyHome from "../svgs/EmptyHome";
import FilledHeart from "../svgs/FilledHeart";
import EmptyHeart from "../svgs/EmptyHeart";
import BoldLoupe from "../svgs/BoldLoupe";
import Loupe from "../svgs/Loupe";
import Avatar from "../avatar/Avatar";
import Item from "./Item";

const StyledList = styled.ul`
  ${rawList}

  display: flex;
  justify-content: space-evenly;
`;

const list = [
  {
    ActiveIcon: FilledHome,
    InactiveIcon: EmptyHome,
    name: "home",
    path: "/",
  },
  {
    ActiveIcon: BoldLoupe,
    InactiveIcon: Loupe,
    name: "search",
    path: "/search",
  },
  {
    ActiveIcon: FilledHeart,
    InactiveIcon: EmptyHeart,
    name: "notifications",
    path: "/notifications",
  },
  {
    ActiveIcon: Avatar,
    InactiveIcon: Avatar,
    name: "account",
    path: "/account",
  },
];

const List = () => {
  return (
    <StyledList>
      {list.map((item) => (
        <Item key={item.name} item={item} />
      ))}
    </StyledList>
  );
};

export default memo(List);
