import { memo } from "react";
import styled from "styled-components";
import Image from "next/image";
import PropTypes from "prop-types";
import { shadows, sizes } from "../../utils/style";

const aspectRatio = 0.66666;
const height = 125;

const StyledCover = styled.div`
  height: ${height}px;
  width: ${height * aspectRatio}px;
  position: relative;
  background-color: #ddd;
  margin-right: 1em;
  margin-top: 10px;
  /* To align cover top with the top of the stars
    (star container height (48) - star height (28)) / 2
  */
  box-shadow: ${shadows.cover.default};

  .review__cover {
    border-radius: ${sizes.borderRadius.default};
  }
`;

const Cover = ({ coverPath }) => {
  return (
    <StyledCover>
      <Image
        className="review__cover"
        src={
          coverPath
            ? `https://image.tmdb.org/t/p/w92${coverPath}`
            : "/images/logo.png"
        }
        alt="Buffs logo"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    </StyledCover>
  );
};

Cover.propTypes = {
  coverPath: PropTypes.string,
};

export default memo(Cover);
