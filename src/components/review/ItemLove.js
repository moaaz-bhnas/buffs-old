import { memo } from "react";
import styled from "styled-components";
import Button from "./Button";

const Item = styled.li``;

const ItemLove = () => {
  return (
    <Item>
      <Button
        text="Love"
        icon={`/images/${false ? "filled" : "empty"}-heart.svg`}
      />
    </Item>
  );
};

export default memo(ItemLove);
