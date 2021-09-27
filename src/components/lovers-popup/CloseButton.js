import { forwardRef, memo } from "react";
import Image from "next/image";
import styled from "styled-components";
import PropTypes from "prop-types";
import { rawButton } from "../../utils/style";

const Button = styled.button`
  ${rawButton}

  width: 3rem;
  height: 3rem;
  margin-right: -1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 0;
`;

const CloseButton = forwardRef(({ size = 20, hideLovers }, ref) => {
  return (
    <Button
      type="button"
      aria-label="close likers popup"
      onClick={hideLovers}
      ref={ref}
    >
      <Image
        src="/images/close.svg"
        alt=""
        width={size}
        height={size}
        layout="fixed"
        quality={100}
      />
    </Button>
  );
});

CloseButton.propTypes = {
  hideLovers: PropTypes.func,
};

export default memo(CloseButton);
