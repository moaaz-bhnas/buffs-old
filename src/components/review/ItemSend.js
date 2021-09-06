import { memo } from "react";
import styled from "styled-components";
import Button from "./Button";

const Item = styled.li``;

const ItemSend = () => {
  return (
    <Item>
      <Button text="Send" icon="/images/send.svg" />
    </Item>
  );
};

export default memo(ItemSend);
