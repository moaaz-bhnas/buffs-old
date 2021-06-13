import { motion } from "framer-motion";
import { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../../components/review/Input";
import Results from "../../components/review/Results";
import Cover from "../../components/review/Cover";
import { search } from "../../api";
import PropTypes from "prop-types";
import { reviewContainerStyles } from "../../utils/style";

const StyledModal = styled(motion.div)`
  ${reviewContainerStyles}
`;

const Form = styled(motion.form)``;

const Title = styled.h2``;

// const variants = {
//   collapsed: {
//     height: "auto",
//   },
//   expanded: {
//     height: 250,
//     position: "fixed",
//     // transition: {
//     //   duration: 5,
//     //   type: "spring",
//     //   stiffness: 70,
//     // },
//   },
// };

const Modal = ({ expanded, setExpanded }) => {
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

      setSelectedMovie(null);
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

  const coverPath = selectedMovie && selectedMovie.poster_path;

  return (
    <StyledModal
      role="dialog"
      aria-labelledby="review__title"
      aria-modal={true}
      expanded={true}
    >
      <Form>
        <Title id="review__title">Review Movie</Title>
        <Input
          layoutId="review__input"
          query={query}
          setQuery={setQuery}
          expanded={expanded}
          setExpanded={setExpanded}
        />
        <Results results={results} />
        <Cover coverPath={coverPath} />
      </Form>
    </StyledModal>
  );
};

Modal.propTypes = {
  expanded: PropTypes.bool,
  setExpanded: PropTypes.func,
};

export default memo(Modal);
