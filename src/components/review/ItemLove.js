import { memo } from "react";
import styled from "styled-components";
import Button from "./Button";
import PropTypes from "prop-types";

const Item = styled.li``;

const ItemLove = ({ toggleLover, loved }) => {
  return (
    <Item>
      <Button
        text="Love"
        icon={`/images/${loved ? "filled" : "empty"}-heart.svg`}
        onClick={toggleLover}
      />
    </Item>
  );
};

ItemLove.propTypes = {
  toggleLover: PropTypes.func,
  loved: PropTypes.bool,
};

export default memo(ItemLove);
