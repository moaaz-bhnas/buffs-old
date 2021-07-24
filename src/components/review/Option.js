import Image from "next/image";
import { memo } from "react";
import styled from "styled-components";
import { imageBaseUrl } from "../../utils/data/tmdb";
import PropTypes from "prop-types";
import { sizes } from "../../utils/style";
import dateToYear from "../../utils/helpers/dateToYear";

const StyledOption = styled.div`
  padding: 0.5rem;
  cursor: pointer;

  display: flex;
  /* align-items: center; */

  &:hover {
    background-color: #eee;
  }

  .review__optionImage {
    border-radius: ${sizes.borderRadius.default};
  }
`;

const Text = styled.div`
  margin-left: 0.75rem;
`;

const Title = styled.p`
  margin: 0 0 0.15rem 0;

  font-size: 1.05rem;
  font-weight: 500;
`;

const ReleaseYear = styled.p`
  margin: 0;

  color: ${({ theme }) => theme.text.grey};
`;

const Option = (props) => {
  console.log("props: ", props);
  const { data, innerRef, innerProps } = props;
  const { label, poster_path, release_date } = data;
  const imageWidth = 50;

  const src = poster_path
    ? `${imageBaseUrl}w92${poster_path}`
    : "/images/logo.png";

  return (
    <StyledOption ref={innerRef} {...innerProps}>
      <Image
        className="review__optionImage"
        src={src}
        alt=""
        width={imageWidth}
        height={imageWidth * (3 / 2)}
        layout="fixed"
        objectFit="cover"
        quality={100}
        priority={true}
      />
      <Text>
        <Title>{label}</Title>
        <ReleaseYear>{dateToYear(release_date)}</ReleaseYear>
      </Text>
    </StyledOption>
  );
};

Option.propTypes = {
  props: PropTypes.object,
};

export default memo(Option);
