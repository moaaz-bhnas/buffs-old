import { memo } from "react";
import { components } from "react-select";
import styled from "styled-components";
import PropTypes from "prop-types";
import { sizes } from "../../utils/style";
import dateToYear from "../../utils/helpers/dateToYear";
import Cover from "../cover/Cover";

const StyledOption = styled.div`
  cursor: pointer;

  display: flex;

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
  const { label, poster_path, release_date } = props.data;

  return (
    <components.Option {...props}>
      <StyledOption>
        <Cover height={75} coverPath={poster_path} tmdbWidth={92} />
        <Text>
          <Title>{label}</Title>
          <ReleaseYear>{dateToYear(release_date)}</ReleaseYear>
        </Text>
      </StyledOption>
    </components.Option>
  );
};

Option.propTypes = {
  props: PropTypes.object,
};

export default memo(Option);
