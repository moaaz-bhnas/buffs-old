import { memo } from "react";
import styled from "styled-components";
import { rawList } from "../../utils/style";
import ItemComment from "./ItemComment";
import ItemLove from "./ItemLove";
import ItemSend from "./ItemSend";

const List = styled.ul`
  ${rawList}

  margin-top: -.7rem;
  margin-bottom: 0.3rem; // To cancel button paddings effect
  display: flex;

  > li {
    flex: 1 0;
  }
`;

const ReactionBar = () => {
  return (
    <List>
      <ItemLove />
      <ItemComment />
      <ItemSend />
    </List>
  );
};

export default memo(ReactionBar);
