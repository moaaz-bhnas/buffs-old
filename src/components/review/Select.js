import { useSession } from "next-auth/client";
import { forwardRef, memo, useCallback, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { search } from "../../api";
import PropTypes from "prop-types";
import dateToYear from "../../utils/helpers/dateToYear";
import movieNameWithReleaseDate from "../../utils/helpers/movieNameWithReleaseDate";

const Select = forwardRef(({ value, onChange, onFocus }, ref) => {
  const [session] = useSession();
  const fullName = session.user.name;
  const firstName = fullName.split(" ")[0];

  const [query, setQuery] = useState("");

  const loadOptions = useCallback(async (query) => {
    const { results } = await search(query);

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
