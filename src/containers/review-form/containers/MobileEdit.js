import { memo, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Cover from "../../../components/cover/Cover";
import Rating from "../../../components/review-form/Rating";
import WriteUp from "../../../components/review-form/WriteUp";
import Loader from "../../../components/review-form/Loader";
import MovieTitle from "../../../components/review-form/MovieTitle";
import Genres from "../../../components/review-form/Genres";
import SubmitButton from "../../../components/review-form/Button";
import { mediaQueries, sizes } from "../../../utils/style";
import { useRouter } from "next/dist/client/router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: ${sizes.width.card};
`;

const Row = styled.div`
  margin-bottom: 1rem;

  display: flex;

  @media screen and (max-width: ${mediaQueries.reviewForm.row}) {
    flex-direction: column;
  }
`;

const CoverContainer = styled.div`
  margin-right: 1em;
  /* To align cover top with the top of the stars
    (star container height (48) - star height (28)) / 2
  */
  margin-top: 10px;
`;

const Column = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
`;

const Form = ({
  onSubmit,
  selectedMovie,
  rating,
  setRating,
  writeUp,
  setWriteUp,
  loading,
}) => {
  const router = useRouter();
  const ratingRef = useRef(null);

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const originalRating = useRef(rating);
  const originalWriteUp = useRef(writeUp);

  useEffect(
    function enableSubmit() {
      const valuesNotUpdated =
        rating === originalRating.current &&
        writeUp === originalWriteUp.current;

      setSubmitDisabled(valuesNotUpdated);
    },
    [rating, writeUp]
  );

  useEffect(() => {
    ratingRef.current.focus();
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      setSubmitDisabled(true);
      await onSubmit(event);
      router.push("/");
    },
    [rating, writeUp]
  );

  const { name, releaseYear, posterPath, genres } = selectedMovie;

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <MovieTitle title={`${name} (${releaseYear})`} />
        <Genres genres={genres.join(", ")} />

        <Row>
          <CoverContainer>
            <Cover coverPath={posterPath} height={125} tmdbWidth={92} />
          </CoverContainer>
          <Column>
            <Rating rating={rating} setRating={setRating} ref={ratingRef} />
            <WriteUp writeUp={writeUp} setWriteUp={setWriteUp} />
          </Column>
        </Row>

        <SubmitButton text="Save" disabled={submitDisabled} />

        <Loader loading={loading} />
      </StyledForm>
    </Container>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func,
  selectedMovie: PropTypes.object,
  rating: PropTypes.number,
  setRating: PropTypes.func,
  writeUp: PropTypes.string,
  setWriteUp: PropTypes.func,
  loading: PropTypes.bool,
};

export default memo(Form);
