import { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { search } from "../../api";
import Input from "../../components/review/Input";
import Results from "../../components/review/Results";
import { sizes } from "../../utils/style";

const Form = styled.form`
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.border.grey2};
  width: ${sizes.width.card};
  padding: 0.8em 1em;
  border-radius: ${sizes.borderRadius.default};
`;

const Review = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(
    async function fetchAndSetResults() {
      if (query === "") {
        return setResults([]);
      }

      const selectedMovie = getSelectedMovie(query);
      if (selectedMovie) {
        setSelectedMovie(selectedMovie);
        return setResults([]);
      }

      const { results } = await search(query);
      setResults(results);
    },
    [query]
  );

  const getSelectedMovie = useCallback(
    (query) => {
      const selectedMovie = results.find((result) => result.title === query);
      return selectedMovie;
    },
    [results]
  );

  return (
    <Form>
      <Input query={query} setQuery={setQuery} />
      <Results results={results} />
    </Form>
  );
};

export default memo(Review);
