import { memo, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { rawButton } from "../../utils/style";

const StyledItem = styled.li`
  margin-left: 0.5rem;

  .svg {
    width: 1.375rem;
  }
`;

const Button = styled.button`
  ${rawButton}

  padding: 0;
  width: 3rem;
  height: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = ({ item }) => {
  const itemRef = useRef(null);
  const [active, setActive] = useState(false);

  const handleClickOutside = useCallback((event) => {
    const { target } = event;

    if (!itemRef.current.contains(target)) {
      setActive(false);
    }
  }, []);

  useEffect(() => {
    if (!active) return;

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [active]);

  const { name, ActiveIcon, InactiveIcon } = item;

  return (
    <StyledItem ref={itemRef}>
      <Button
        type="button"
        aria-label={`toggle ${name} panel`}
        onClick={() => setActive(!active)}
      >
        {active ? <ActiveIcon active /> : <InactiveIcon />}
      </Button>
    </StyledItem>
  );
};

Item.propTypes = {
  item: PropTypes.object,
};

export default memo(Item);
