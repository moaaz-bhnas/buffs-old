import { memo } from "react";
import styled from "styled-components";
import Image from "next/image";
import PropTypes from "prop-types";
import { shadows, sizes } from "../../utils/style";

const aspectRatio = 0.66666;

const StyledCover = styled.div`
  height: ${({ height }) => height}px;
  width: ${({ height }) => height * aspectRatio}px;
  position: relative;
  background-color: #ddd;
  box-shadow: ${({ boxShadow }) => boxShadow && shadows.cover.default};

  .review__cover {
    border-radius: ${sizes.borderRadius.default};
  }
`;

const Cover = ({
  height = 125,
  coverPath,
  tmdbWidth = 92,
  boxShadow = true,
}) => {
  return (
    <StyledCover height={height} boxShadow={boxShadow}>
      <Image
        className="review__cover"
        src={
          coverPath
            ? `https://image.tmdb.org/t/p/w${tmdbWidth}${coverPath}`
            : "/images/logo.png"
        }
        alt=""
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    </StyledCover>
  );
};

Cover.propTypes = {
  height: PropTypes.number,
  tmdbWidth: PropTypes.number,
  coverPath: PropTypes.string,
  boxShadow: PropTypes.bool,
};

export default memo(Cover);
