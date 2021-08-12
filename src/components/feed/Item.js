import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledItem = styled.div``;

const Item = ({ review }) => {
  return <StyledItem>{review._id}</StyledItem>;
};

Item.propTypes = {
  review: PropTypes.object,
};

export default memo(Item);
