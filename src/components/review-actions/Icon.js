import { memo } from "react";
import Image from "next/image";

const Icon = () => {
  return (
    <Image
      className="review__dotsIcon"
      src="/images/three-dots.svg"
      alt=""
      width={22}
      height={22}
      layout="fixed"
      quality={100}
    />
  );
};

export default memo(Icon);
