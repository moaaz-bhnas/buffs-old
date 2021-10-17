import { memo, useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button } from "./style";

const Item = styled.li``;

const MenuItem = ({ active, onClick }) => {
  console.log("active: ", active);

  const itemRef = useRef(null);

  useEffect(
    function focusIfActive() {
      if (active) {
        itemRef.current.focus();
      }
    },
    [active]
  );

  return (
    <Item role="none">
      <Button
        role="menuitem"
        onClick={onClick}
        tabIndex={active ? 0 : -1}
        ref={itemRef}
      >
        Remove
      </Button>
    </Item>
  );
};

MenuItem.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default memo(MenuItem);
