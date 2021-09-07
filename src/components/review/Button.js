import { memo } from "react";
import Image from "next/image";
import styled from "styled-components";
import { rawButton, sizes } from "../../utils/style";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  ${rawButton}

  width: 100%;
  padding: 0.7rem 0;
  border-radius: ${sizes.borderRadius.default};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.bg.grey1};
  }
`;

const Text = styled.span`
  margin-left: 0.5rem;
`;

const Button = ({ text, icon, onClick }) => {
  return (
    <StyledButton type="button" onClick={onClick}>
      <Image
        className="review__reaction-icon"
        src={icon}
        alt=""
        width={18} // Facebook: 18
        height={18}
        quality={100}
      />
      <Text>{text}</Text>
    </StyledButton>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

export default memo(Button);
