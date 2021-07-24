import { forwardRef, memo, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/client";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import { search } from "../../api";
import PropTypes from "prop-types";
import dateToYear from "../../utils/helpers/dateToYear";
import movieNameWithReleaseDate from "../../utils/helpers/movieNameWithReleaseDate";
import { sizes } from "../../utils/style";
import styled from "styled-components";
import { imageBaseUrl } from "../../utils/data/tmdb";

const Option = styled.div`
  padding: 1em;
`;

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: sizes.borderRadius.default,
  }),
};

const CustomOption = (props) => {
  console.log("props: ", props);
  const { data, innerRef, innerProps } = props;
  const { label, poster_path } = data;
  const imageWidth = 50;

  return (
    <Option ref={innerRef} {...innerProps}>
      <Image
        src={`${imageBaseUrl}w92${poster_path}`}
        alt=""
        width={imageWidth}
        height={imageWidth * (3 / 2)}
        layout="fixed"
        objectFit="cover"
        quality={100}
        priority={true}
      />
      {label}
    </Option>
  );
};

const Select = forwardRef(({ value, onChange, onFocus }, ref) => {
  const [session] = useSession();
  const fullName = session.user.name;
  const firstName = fullName.split(" ")[0];

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const [dropdownIndicatorVisible, setDropdownIndicatorVisible] =
    useState(false);

  useEffect(() => {
    setDropdownIndicatorVisible(results.length && query);
  }, [query, results]);

  const loadOptions = useCallback(async (query) => {
    const { results } = await search(query);
    setResults(results);

    const options = results.map((result) => {
      const label = movieNameWithReleaseDate(
        result.title,
        dateToYear(result.release_date)
      );

      return {
        ...result,
        value: result.id,
        label,
      };
    });
    return options;
  }, []);

  return (
    <AsyncSelect
      aria-label="search for a movie"
      placeholder={`What did you watch today, ${firstName}?`}
      aria-live="polite"
      cacheOptions
      inputValue={query}
      onInputChange={(value) => setQuery(value)}
      loadOptions={loadOptions}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      ref={ref}
      noOptionsMessage={() => null}
      styles={customStyles}
      components={{
        DropdownIndicator: dropdownIndicatorVisible
          ? components.DropdownIndicator
          : () => null,
        IndicatorSeparator: dropdownIndicatorVisible
          ? components.IndicatorSeparator
          : () => null,
        Option: CustomOption,
      }}
      isClearable
      escapeClearsValue
    />
  );
});

Select.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
};

export default memo(Select);
