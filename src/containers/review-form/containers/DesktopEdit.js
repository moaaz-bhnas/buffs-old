import { memo, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Overlay from "../../../components/overlay/Overlay";
import { cardStyles, rawButton, sizes } from "../../../utils/style";
import Cover from "../../../components/cover/Cover";
import Rating from "../../../components/review-form/Rating";
import WriteUp from "../../../components/review-form/WriteUp";
import useUpdateEffect from "../../../hooks/useUpdateEffect";
import CloseModal from "../../../components/review-form/CloseModal";

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

const MovieTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 0.25rem 0;
  font-weight: normal;
`;

const Genres = styled.p`
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.text.grey};
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

const SubmitButton = styled.button`
  ${rawButton}
  font-weight: 500;
  color: #fff;
  background-color: ${({ theme }) => theme.bg.dark};
  display: block;
  width: 100%;
  padding: 0.5em;
  border-radius: ${sizes.borderRadius.default};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5 !important;
  }
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
  const ratingRef = useRef(null);

  const [submitDisabled, setSubmitDisabled] = useState(true);

  const { name, releaseYear, posterPath, genres } = selectedMovie;

  useUpdateEffect(
    function enableSubmit() {
      setSubmitDisabled(false);
    },
    [rating, writeUp]
  );

  useEffect(() => {
    ratingRef.current.focus();
  }, []);

  return (
    <Container>
      <Overlay expanded close={() => setEditModalVisible(false)} />
      <Modal role="dialog" aria-modal="true" aria-label="Edit review">
        <StyledForm>
          <Header>
            <Title>Edit Review</Title>
            <CloseModal close={() => setEditModalVisible(false)} />
          </Header>

          <MovieTitle>
            {name} ({releaseYear})
          </MovieTitle>
          <Genres>{genres.join(", ")}</Genres>

          <Row>
            <CoverContainer>
              <Cover coverPath={posterPath} height={125} tmdbWidth={92} />
            </CoverContainer>
            <Column>
              <Rating rating={rating} setRating={setRating} ref={ratingRef} />
              <WriteUp writeUp={writeUp} setWriteUp={setWriteUp} />
            </Column>
          </Row>

          <SubmitButton type="submit" disabled={submitDisabled}>
            Save
          </SubmitButton>
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
