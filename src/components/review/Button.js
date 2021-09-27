import { memo } from "react";
import Image from "next/image";
import styled from "styled-components";
import { mediaQueries, rawButton, sizes } from "../../utils/style";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  ${rawButton}

  color: inherit;

  width: 100%;
  padding: 0.7rem 0;
  border-radius: ${sizes.borderRadius.default};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.bg.grey1};
  }

  .review__reaction-icon {
    width: 22px !important;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 18px;
  height: 18px;

  @media screen and (max-width: ${mediaQueries.review.reaction}) {
    width: 22px;
    height: 22px;
  }
`;

const Text = styled.span`
  margin-left: 0.5rem;

  @media screen and (max-width: ${mediaQueries.review.reaction}) {
    display: none;
  }
`;

const Button = ({ text, icon, onClick }) => {
  return (
    <StyledButton type="button" onClick={onClick}>
      <ImageContainer>
        <Image
          className="review__reaction-icon"
          src={icon}
          alt={text}
          layout="fill" // Facebook size: 18
          quality={100}
        />
      </ImageContainer>
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
