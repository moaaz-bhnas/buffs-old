import { motion } from "framer-motion";
import { memo } from "react";
import styled from "styled-components";
import Image from "next/image";
import PropTypes from "prop-types";

const aspectRatio = 0.66666;
const height = 100;

const StyledCover = styled(motion.div)`
  height: ${height}px;
  width: ${height * aspectRatio}px;
  position: relative;
  background-color: #ddd;
`;

const Cover = ({ coverPath }) => {
  console.log(`https://image.tmdb.org/t/p/w92${coverPath}`);

  return (
    <StyledCover>
      <Image
        src={
          coverPath
            ? `https://image.tmdb.org/t/p/w92${coverPath}`
            : "/images/logo.png"
        }
        alt="Buffs logo"
        layout="fill"
        objectFit="contain"
        quality={100}
        priority={true}
      />
    </StyledCover>
  );
};

Cover.propTypes = {
  coverPath: PropTypes.string,
};

export default memo(Cover);
