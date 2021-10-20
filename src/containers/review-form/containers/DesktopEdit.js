import { memo, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Overlay from "../../../components/overlay/Overlay";
import { cardStyles, rawButton, sizes } from "../../../utils/style";
import Cover from "../../../components/cover/Cover";
import Rating from "../../../components/review-form/Rating";
import WriteUp from "../../../components/review-form/WriteUp";
import CloseModal from "../../../components/review-form/CloseModal";
import Loader from "../../../components/review-form/Loader";
import MovieTitle from "../../../components/review-form/MovieTitle";
import Genres from "../../../components/review-form/Genres";
import SubmitButton from "../../../components/review-form/Button";

const Container = styled.div``;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const StyledForm = styled.form`
  ${cardStyles}
`;

const Header = styled.header`
  padding: 0 1rem 0.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.border.grey2};
  margin: 0 -1rem 0.8rem;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  position: relative;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.15rem;
  padding: 0.25rem 0;
  margin: 0 auto;
`;

const Row = styled.div`
  margin-bottom: 1rem;

  display: flex;
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
  setEditModalVisible,
}) => {
  const closeButtonRef = useRef(null);
  const ratingRef = useRef(null);
  const writeUpRef = useRef(null);
  const submitButtonRef = useRef(null);

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

  const handleKeyDown = useCallback(
    function trapFocus(
      event,
      firstInteractive,
      lastInteractive,
      submit,
      close
    ) {
      const { target, key, shiftKey } = event;

      if (key === "Tab" && shiftKey && target === firstInteractive) {
        event.preventDefault();
        lastInteractive.focus();
      }

      if (key === "Tab" && !shiftKey && target === lastInteractive) {
        event.preventDefault();
        firstInteractive.focus();
      }

      if (key === "Enter") {
        event.preventDefault();
        submit();
      }

      if (key === "Escape") {
        close();
      }
    },
    [rating, writeUp]
  );

  const handleSubmit = useCallback(
    async (event) => {
      await onSubmit(event);
      setEditModalVisible(false);
    },
    [rating, writeUp]
  );

  const { name, releaseYear, posterPath, genres } = selectedMovie;

  return (
    <Container>
      <Overlay expanded close={() => setEditModalVisible(false)} />
      <Modal role="dialog" aria-modal="true" aria-label="Edit review">
        <StyledForm
          onSubmit={handleSubmit}
          onKeyDown={(event) =>
            handleKeyDown(
              event,
              closeButtonRef.current,
              submitDisabled ? writeUpRef.current : submitButtonRef.current,
              () => handleSubmit(event),
              () => setEditModalVisible(false)
            )
          }
        >
          <Header>
            <Title>Edit Review</Title>
            <CloseModal
              close={() => setEditModalVisible(false)}
              ref={closeButtonRef}
            />
          </Header>

          <MovieTitle title={`${name} (${releaseYear})`} />
          <Genres genres={genres.join(", ")} />

          <Row>
            <CoverContainer>
              <Cover coverPath={posterPath} height={125} tmdbWidth={92} />
            </CoverContainer>
            <Column>
              <Rating rating={rating} setRating={setRating} ref={ratingRef} />
              <WriteUp
                writeUp={writeUp}
                setWriteUp={setWriteUp}
                ref={writeUpRef}
              />
            </Column>
          </Row>

          <SubmitButton text="Save" disabled={submitDisabled} />

          <Loader loading={loading} />
        </StyledForm>
      </Modal>
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
  setEditModalVisible: PropTypes.func,
};

export default memo(Form);
