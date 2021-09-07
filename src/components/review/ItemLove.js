import { memo } from "react";
import styled from "styled-components";
import Button from "./Button";
import PropTypes from "prop-types";

const Item = styled.li`
  color: ${({ loved, theme }) => (loved ? theme.bg.love : null)};
`;

const ItemLove = ({ toggleLover, loved }) => {
  return (
    <Item loved={loved}>
      <Button
        text="Love"
        icon={`/images/heart-${loved ? "filled" : "empty"}.svg`}
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
