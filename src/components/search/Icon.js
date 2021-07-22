import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { mediaQueries } from "../../utils/style";
import SearchIcon from "../svgs/Search";

const Container = styled.div`
  padding: 0 0.6em;
  cursor: text;

  .searchForm_svg {
    fill: ${({ theme }) => theme.icon.default};
    width: 15px;
  }
`;

const Icon = ({ active }) => {
  return (
    <Container active={active}>
      <SearchIcon className="searchForm_svg" />
    </Container>
  );
};

Icon.propTypes = {
  active: PropTypes.bool,
};

export default memo(Icon);
