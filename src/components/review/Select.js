import { useSession } from "next-auth/client";
import { forwardRef, memo, useCallback, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { search } from "../../api";
import PropTypes from "prop-types";
import dateToYear from "../../utils/helpers/dateToYear";
import movieNameWithReleaseDate from "../../utils/helpers/movieNameWithReleaseDate";
import { sizes } from "../../utils/style";

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: sizes.borderRadius.default,
  }),
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
      components={
        !dropdownIndicatorVisible && {
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }
      }
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
