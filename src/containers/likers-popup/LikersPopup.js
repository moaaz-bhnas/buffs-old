import { memo, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CloseButton from "../../components/likers-popup/CloseButton";
import List from "../../components/likers-popup/List";
import { cardStyles, mediaQueries } from "../../utils/style";

const Popup = styled.div`
  ${cardStyles}
  width: 25rem;

  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  z-index: 2;

  @media screen and (max-width: ${mediaQueries.likersPopup.main}) {
    width: 95%;
  }
`;

const Header = styled.div`
  padding-bottom: 0.8rem;
  position: relative;
  margin-bottom: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: -1rem;
    width: calc(100% + 2rem);
    height: 1px;
    background-color: ${({ theme }) => theme.bg.grey2};
  }
`;

const Title = styled.h4`
  font-size: 1.1rem;
  margin: 0;
  font-weight: 500;
`;

const LikersPopup = ({ likersObjects, hideLikers }) => {
  const firstInteractive = useRef(null);
  const lastInteractive = useRef(null);

  useEffect(() => {
    firstInteractive.current.focus();
  }, []);

  const handleKeyDown = useCallback(function trapFocus(
    event,
    firstInteractive,
    lastInteractive,
    close
  ) {
    const { target, key, shiftKey } = event;

    if (key === "Tab" && shiftKey && target === firstInteractive) {
      event.preventDefault();
      lastInteractive.focus();
    }

    if (key === "Tab" && !shiftKey && target === lastInteractive) {
      event.preventDefault();
      firstInteractive.focus();
    }

    if (key === "Escape") {
      close();
    }
  },
  []);

  return (
    <Popup
      aria-live="polite"
      aria-atomic="true"
      onKeyDown={(event) =>
        handleKeyDown(
          event,
          firstInteractive.current,
          lastInteractive.current,
          hideLikers
        )
      }
    >
      <Header>
        <Title>Likes</Title>

        <CloseButton hideLikers={hideLikers} ref={firstInteractive} />
      </Header>

      <List users={likersObjects} ref={lastInteractive} />
    </Popup>
  );
};

LikersPopup.propTypes = {
  likersObjects: PropTypes.array,
  hidelikers: PropTypes.func,
};

export default memo(LikersPopup);
