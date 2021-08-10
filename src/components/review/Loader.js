import { memo } from "react";
import styled from "styled-components";

const StyledLoader = styled.div``;

const P = styled.p`
  font-size: 1.15rem;
  font-weight: 500;
`;

const Loader = () => {
  return (
    <StyledLoader>
      <P>Adding your review</P>
    </StyledLoader>
  );
};

export default memo(Loader);
