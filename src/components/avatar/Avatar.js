import Image from "next/image";
import { memo } from "react";
import PropTypes from "prop-types";

const Avatar = ({ image, alt = "", size = 22, className = "avatar" }) => {
  return (
    <Image
      className={className}
      src={image}
      alt={alt}
      width={size}
      height={size}
      layout="fixed"
      quality={100}
      priority={true}
    />
  );
};

Avatar.propTypes = {
  image: PropTypes.string,
};

export default memo(Avatar);
