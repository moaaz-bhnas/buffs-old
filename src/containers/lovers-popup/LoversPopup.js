import { memo, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CloseButton from "../../components/lovers-popup/CloseButton";
import List from "../../components/lovers-popup/List";
import { cardStyles, mediaQueries } from "../../utils/style";

const Popup = styled.div`
  ${cardStyles}
  width: 25rem;

  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  z-index: 2;

  @media screen and (max-width: ${mediaQueries.loversPopup.main}) {
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

const LoversPopup = ({ loversObjects, hideLovers }) => {
  const firstInteractive = useRef(null);
  const lastInteractive = useRef(null);

  useEffect(() => {
    firstInteractive.current.focus();
  }, []);

  const handleKeyDown = useCallback(
    function trapFocus(event, firstInteractive, lastInteractive, close) {
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
    []
  );

  return (
    <Popup
      aria-live="polite"
      aria-atomic="true"
      onKeyDown={(event) =>
        handleKeyDown(
          event,
          firstInteractive.current,
          lastInteractive.current,
          hideLovers
        )
      }
    >
      <Header>
        <Title>Likes</Title>

        <CloseButton hideLovers={hideLovers} ref={firstInteractive} />
      </Header>

      <List users={loversObjects} ref={lastInteractive} />
    </Popup>
  );
};

LoversPopup.propTypes = {
  loversObjects: PropTypes.array,
  hideLovers: PropTypes.func,
};

export default memo(LoversPopup);
