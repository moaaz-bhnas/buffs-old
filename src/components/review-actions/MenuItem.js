import { forwardRef, memo, useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { rawButton, sizes, transitions } from "../../utils/style";

const Item = styled.li``;

const Button = styled.button`
  ${rawButton}

  width: 100%;
  padding: 0.6rem;
  border-radius: ${sizes.borderRadius.default};
  text-align: left;

  font-weight: 500;

  transition: background-color ${transitions.bg.default};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.bg.grey1};
  }
`;

const MenuItem = ({ item, active }) => {
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
        onClick={item.onClick}
        tabIndex={active ? 0 : -1}
        ref={itemRef}
      >
        {item.text}
      </Button>
    </Item>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.bool,
};

export default memo(MenuItem);
