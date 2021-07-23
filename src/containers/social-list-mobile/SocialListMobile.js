import { memo } from "react";
import styled from "styled-components";
import { mediaQueries, rawList } from "../../utils/style";
import Item from "../../components/social-list-mobile/Item";
import PaperPlane from "../../components/svgs/EmptyPaperPlane";
import Plus from "../../components/svgs/Plus";

const List = styled.ul`
  display: none;

  @media screen and (max-width: ${mediaQueries.main}) {
    ${rawList}
    display: flex;

    .svg {
      fill: ${({ theme }) => theme.bg.dark};
    }
  }
`;

const list = [
  {
    Icon: Plus,
    name: "add review",
    path: "/add",
  },
  {
    Icon: PaperPlane,
    name: "inbox",
    path: "/inbox",
  },
];

const SocialListMobile = () => {
  return (
    <List>
      {list.map((item) => (
        <Item key={item.name} item={item} />
      ))}
    </List>
  );
};

export default memo(SocialListMobile);
