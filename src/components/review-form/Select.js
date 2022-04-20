import { forwardRef, memo, useCallback, useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import { search } from "../../lib/tmdb";
import PropTypes from "prop-types";
import { sizes } from "../../utils/style";
import Option from "./Option";

const Select = forwardRef(
  (
    { id, value, onChange, onFocus, setMenuExpanded, styles, placeholder },
    ref
  ) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const [dropdownIndicatorVisible, setDropdownIndicatorVisible] =
      useState(false);

    useEffect(() => {
      const menuExpanded = results.length > 0 && query;
      setDropdownIndicatorVisible(menuExpanded);
      setMenuExpanded(menuExpanded);
    }, [query, results]);

    const loadOptions = useCallback(async (query) => {
      const { results } = await search(query);

      setResults(results);

      const options = results.map((result) => {
        return {
          ...result,
          value: result.id,
          label: result.title,
        };
      });
      return options;
    }, []);

    const customStyles = {
      control: (provided) => ({
        ...provided,
        borderRadius: sizes.borderRadius.default,
        backgroundColor: styles.backgroundColor || "#fff",
        minHeight: styles.minHeight || 44,
      }),
    };

    return (
      <AsyncSelect
        aria-label="search for a movie"
        placeholder={placeholder}
        aria-live="polite"
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
          Option,
        }}
        isClearable
        escapeClearsValue
        instanceId={id}
      />
    );
  }
);

Select.propTypes = {
  id: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  setMenuExpnaded: PropTypes.func,
  styles: PropTypes.object,
  placeholder: PropTypes.string,
};

export default memo(Select);
