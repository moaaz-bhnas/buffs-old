import { memo } from "react";
import styled from "styled-components";
import { rawList } from "../../utils/style";
import FilledHome from "../svgs/FilledHome";
import EmptyHome from "../svgs/EmptyHome";
import FilledHeart from "../svgs/FilledHeart";
import EmptyHeart from "../svgs/EmptyHeart";
import BoldLoupe from "../svgs/BoldLoupe";
import Loupe from "../svgs/Loupe";
import Avatar from "../../containers/account-avatar/AccountAvatar";
import Item from "./Item";
import { useSession } from "next-auth/client";

const StyledList = styled.ul`
  ${rawList}

  display: flex;
  justify-content: space-evenly;
`;

const List = () => {
  const [session] = useSession();

  const list = [
    {
      ActiveIcon: FilledHome,
      InactiveIcon: EmptyHome,
      name: "home",
      path: "/",
    },
    // {
    //   ActiveIcon: BoldLoupe,
    //   InactiveIcon: Loupe,
    //   name: "search",
    //   path: "/search",
    // },
    // {
    //   ActiveIcon: FilledHeart,
    //   InactiveIcon: EmptyHeart,
    //   name: "notifications",
    //   path: "/notifications",
    // },
    {
      ActiveIcon: Avatar,
      InactiveIcon: Avatar,
      name: "account",
      path: `/${session ? session.user.username : ""}`,
    },
  ];

  return (
    <StyledList>
      {list.map((item) => (
        <Item key={item.name} item={item} />
      ))}
    </StyledList>
  );
};

export default memo(List);
