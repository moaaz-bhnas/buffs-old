import { memo, useEffect, useRef } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import { Button, Item, ItemText } from "./style";

const MenuItem = ({ active, onClick }) => {
  console.log("exists");

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
        <Image
          src="/images/edit.svg"
          alt=""
          width={20}
          height={20}
          layout="fixed"
          quality={100}
        />
        <ItemText>Edit review</ItemText>
      </Button>
    </Item>
  );
};

MenuItem.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default memo(MenuItem);
