import { memo, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { rawList, shadows, sizes } from "../../utils/style";
import MenuItem from "./MenuItem";

const StyledMenu = styled.ul`
  ${rawList}

  width: 20rem;
  background-color: #fff;

  padding: 0.5em;
  margin-top: 0.7rem;
  border-radius: ${sizes.borderRadius.default};
  box-shadow: ${shadows.actionsMenu.default};

  position: relative;

  &::before {
    content: "";

    position: absolute;
    top: -10px;
    right: 13px;

    // Triangle styles: https://css-tricks.com/snippets/css/css-triangle/
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
  }
`;

const Menu = ({ setExpanded, activeItem, setActiveItem, togglerRef }) => {
  const menuRef = useRef(null);

  const items = [
    { text: "Edit review", onClick: () => console.log("edit") },
    { text: "Remove", onClick: () => console.log("remove") },
  ];

  const handleClickOutside = useCallback((event) => {
    const { target } = event;
    const clickOut = menuRef.current && !menuRef.current.contains(target);
    if (clickOut) {
      setExpanded(false);
    }
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      const { key } = event;

      const lastIndex = items.length - 1;

      switch (key) {
        case "ArrowDown":
          event.preventDefault();
          if (activeItem === lastIndex) {
            setActiveItem(0);
          } else {
            setActiveItem(activeItem + 1);
          }
          break;
        case "ArrowUp":
          event.preventDefault();
          if (activeItem === 0) {
            setActiveItem(lastIndex);
          } else {
            setActiveItem(activeItem - 1);
          }
          break;
        case "Escape":
          setExpanded(false);
          togglerRef.current.focus();
          break;
      }
    },
    [activeItem]
  );

  useEffect(() => {
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <StyledMenu
      role="menu"
      aria-label="Actions"
      ref={menuRef}
      onKeyDown={handleKeyDown}
    >
      {items.map((item, index) => (
        <MenuItem key={item.text} item={item} active={index === activeItem} />
      ))}
    </StyledMenu>
  );
};

Menu.propTypes = {
  setExpanded: PropTypes.func,
  activeItem: PropTypes.number,
  setActiveItem: PropTypes.func,
  togglerRef: PropTypes.object,
};

export default memo(Menu);
