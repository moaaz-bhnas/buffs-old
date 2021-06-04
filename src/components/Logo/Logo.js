import { memo } from "react";
import Image from "next/image";
import PropTypes from "prop-types";

const Logo = ({ width = 48 }) => {
  return (
    <Image
      src="/images/logo.png"
      alt="Buffs logo"
      width={width}
      height={width}
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
