import { memo } from "react";
import styled from "styled-components";
import Button from "./Button";

const Item = styled.li``;

const ItemComment = () => {
  return (
    <Item>
      <Button text="Comment" icon="/images/comment.svg" />
    </Item>
  );
};

export default memo(ItemComment);
