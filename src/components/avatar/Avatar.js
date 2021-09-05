import Image from "next/image";
import { memo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  height: ${({ size }) => size}px;

  .avatar {
    border-radius: 50%;
  }
`;

const Avatar = ({ image, alt = "", size = 22, className = "" }) => {
  return (
    <Container size={size}>
      <Image
        className={`avatar ${className}`}
        src={image}
        alt={alt}
        width={size}
        height={size}
        layout="fixed"
        quality={100}
        priority={true}
      />
    </Container>
  );
};

Avatar.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};

export default memo(Avatar);
