import { memo } from "react";
import styled from "styled-components";
import { sizes } from "../../utils/style";

const formBorderRadius = "0 0 0.5em 0.5em";

const StyledDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;

  padding: 0.5em;
  background-color: #fff;
  border-radius: ${formBorderRadius};
  display: flex;
  justify-content: center;

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 0;
    right: 0;
    top: -${sizes.height.header};
    border-radius: ${formBorderRadius};
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
  }
`;

const P = styled.p`
  color: ${({ theme }) => theme.text.grey};
`;

const Dropdown = () => {
  return (
    <StyledDropdown id="header__searchDropdown">
      <P>No recent searches</P>
    </StyledDropdown>
  );
};

export default memo(Dropdown);
