import { memo } from "react";
import styled from "styled-components";
import Button from "./Button";
import PropTypes from "prop-types";

const Item = styled.li`
  color: ${({ liked, theme }) => (liked ? theme.bg.like : null)};
`;

const ItemLike = ({ toggleLiker, liked }) => {
  return (
    <Item liked={liked}>
      <Button
        text="Like"
        icon={`/images/heart-${liked ? "filled" : "empty"}.svg`}
        onClick={toggleLiker}
      />
    </Item>
  );
};

ItemLike.propTypes = {
  toggleLiker: PropTypes.func,
  liked: PropTypes.bool,
};

export default memo(ItemLike);
