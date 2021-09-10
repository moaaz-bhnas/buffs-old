import { memo } from "react";
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

const CloseButton = ({ size = 20, hideLovers }) => {
  return (
    <Button type="button" aria-label="close likers popup" onClick={hideLovers}>
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
};

CloseButton.propTypes = {
  hideLovers: PropTypes.func,
};

export default memo(CloseButton);
