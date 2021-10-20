import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Title = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 0.25rem 0;
  font-weight: normal;
`;

const MovieTitle = ({ title }) => {
  return <Title>{title}</Title>;
};

MovieTitle.propTypes = {
  Title: PropTypes.string,
};

export default memo(MovieTitle);
