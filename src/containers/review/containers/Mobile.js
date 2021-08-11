import { motion } from "framer-motion";
import { memo, useCallback, useRef, useState } from "react";
import styled, { css } from "styled-components";
import Cover from "../../../components/review/Cover";
import Rating from "../../../components/review/Rating";
import WriteUp from "../../../components/review/WriteUp";
import { sizes } from "../../../utils/style";
import { visibilityVariants } from "../../../utils/animation";
import Button from "../../../components/review/Button";
import PropTypes from "prop-types";
import Select from "../../../components/review/Select";
import Loader from "../../../components/review/Loader";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: ${sizes.width.card};
`;

const Row = styled(motion.div)`
  margin-top: 0.375rem;
  margin-bottom: 1rem;

  display: flex;
`;

const Column = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
`;

const Form = ({
  onSubmit,
  selectedMovie,
  setSelectedMovie,
  rating,
  setRating,
  writeUp,
  setWriteUp,
  loading,
}) => {
  const selectRef = useRef(null);

  const [expanded, setExpanded] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      await onSubmit();
      setExpanded(false);
    },
    [selectedMovie]
  );

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <Select
          id="review__select"
          value={selectedMovie}
          onChange={(movie) => setSelectedMovie(movie)}
          onFocus={() => setExpanded(true)}
          setMenuExpanded={setMenuExpanded}
          styles={{ backgroundColor: "#fff", minHeight: 48 }}
          placeholder="Select a movie"
          dropdownIndicatorAlwaysVisible
          ref={selectRef}
        />
        {expanded && selectedMovie && (
          <>
            <Row
              variants={visibilityVariants}
              initial="hidden"
              animate="visible"
            >
              <Cover coverPath={selectedMovie.poster_path} />
              <Column>
                <Rating rating={rating} setRating={setRating} />
                <WriteUp writeUp={writeUp} setWriteUp={setWriteUp} />
              </Column>
            </Row>
            <Button disabled={rating === 0} />
          </>
        )}
      </StyledForm>
      <Loader loading={loading} />
    </Container>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func,
  selectedMovie: PropTypes.object,
  setSelectedMovie: PropTypes.func,
  rating: PropTypes.number,
  setRating: PropTypes.func,
  writeUp: PropTypes.string,
  setWriteUp: PropTypes.func,
  loading: PropTypes.bool,
};

export default memo(Form);
