import { memo } from "react";
import styled from "styled-components";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import { theme } from "../../utils/style";
import PropTypes from "prop-types";

// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

const StyledLoader = styled.div`
  margin-top: 1rem;
`;

const Loader = ({ loading }) => {
  return (
    <StyledLoader>
      <BeatLoader
        color={theme.bg.grey4}
        loading={loading}
        // css={override}
        size={10}
      />
    </StyledLoader>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool,
};

export default memo(Loader);
