import { memo } from "react";
import Image from "next/image";
import PropTypes from "prop-types";

const Logo = ({ width = 70 }) => {
  return (
    <Image
      src="/images/logo.png"
      alt="Buffs logo"
      width={width}
      height={width * 0.72}
      layout="fixed"
      quality={100}
      priority={true}
    />
  );
};

Logo.propTypes = {
  width: PropTypes.number,
};

export default memo(Logo);
