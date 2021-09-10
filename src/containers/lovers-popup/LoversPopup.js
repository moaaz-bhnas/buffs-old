import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CloseButton from "../../components/lovers-popup/CloseButton";
import List from "../../components/lovers-popup/List";
import { cardStyles } from "../../utils/style";

const Popup = styled.div`
  ${cardStyles}
  width: 25rem;

  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  z-index: 2;
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
  return (
    <Popup aria-live="polite" aria-atomic="true">
      <Header>
        <Title>Likes</Title>

        <CloseButton hideLovers={hideLovers} />
      </Header>

      <List users={loversObjects} />
    </Popup>
  );
};

LoversPopup.propTypes = {
  loversObjects: PropTypes.array,
  hideLovers: PropTypes.func,
};

export default memo(LoversPopup);
