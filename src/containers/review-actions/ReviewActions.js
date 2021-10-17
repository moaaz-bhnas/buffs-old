import { memo, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Menu from "../../components/review-actions/Menu";
import Toggler from "../../components/review-actions/Toggler";

const Container = styled.div`
  margin-left: auto;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  position: absolute;
  top: 0;
  right: 0;
`;

const ReviewActions = ({ setEditModalVisible }) => {
  const togglerRef = useRef(null);

  const [expanded, setExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  return (
    <Container>
      <Toggler expanded={expanded} setExpanded={setExpanded} ref={togglerRef} />
      {expanded && (
        <Menu
          setExpanded={setExpanded}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          togglerRef={togglerRef}
          setEditModalVisible={setEditModalVisible}
        />
      )}
    </Container>
  );
};

ReviewActions.propTypes = {
  setEditModalVisible: PropTypes.func,
};

export default memo(ReviewActions);
