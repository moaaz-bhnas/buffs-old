import Image from "next/image";
import { memo } from "react";
import PropTypes from "prop-types";

const Star = ({ state, height }) => {
  return (
    <Image
      className="review__star"
      src={`/images/star-${state}.svg`}
      alt={`${state} star`}
      layout="fixed"
      width={height}
      height={height}
      quality={100}
    />
  );
};

Star.propTypes = {
  state: PropTypes.string,
  height: PropTypes.number,
};

export default memo(Star);
