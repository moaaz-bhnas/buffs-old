import { memo } from "react";
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
  width: 2.5rem;
  height: 2.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = ({ item }) => {
  const { name, ActiveIcon } = item;

  return (
    <StyledItem>
      <Button type="button">
        <ActiveIcon />
      </Button>
    </StyledItem>
  );
};

Item.propTypes = {
  item: PropTypes.object,
};

export default memo(Item);
