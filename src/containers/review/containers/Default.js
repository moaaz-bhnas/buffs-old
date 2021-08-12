import { motion } from "framer-motion";
import { memo, useCallback, useRef, useState } from "react";
import styled, { css } from "styled-components";
import Overlay from "../../../components/review/Overlay";
import Title from "../../../components/review/Title";
import Cover from "../../../components/review/Cover";
import Rating from "../../../components/review/Rating";
import WriteUp from "../../../components/review/WriteUp";
import { mediaQueries, sizes, theme } from "../../../utils/style";
import { visibilityVariants } from "../../../utils/animation";
import Button from "../../../components/review/Button";
import PropTypes from "prop-types";
import Select from "../../../components/review/Select";
import Loader from "../../../components/review/Loader";
import { useSession } from "next-auth/client";

const expandedStyles = css`
  position: relative;
  z-index: 2;
`;

const Container = styled.div`
  @media screen and (max-width: ${mediaQueries.main}) {
    display: none;
  }
`;

const StyledForm = styled.form`
  position: relative;
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.border.grey2};
  width: ${sizes.width.card};
  padding: 0.8rem 1rem;
  border-radius: ${sizes.borderRadius.default};

  ${({ expanded }) => expanded && expandedStyles}
`;

const Row = styled(motion.div)`
  margin-top: 0.375rem;
  margin-bottom: 1rem;

  display: flex;
  /* align-items: center; */
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
  const [session] = useSession();
  const fullName = session.user.name;
  const firstName = fullName.split(" ")[0];

  const selectRef = useRef(null);
  const buttonRef = useRef(null);

  const [expanded, setExpanded] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);

  const handleKeyDown = useCallback(
    (event) => {
      const { target, key, shiftKey } = event;
      const { inputRef } = selectRef.current.select.select;
      const firstInteractive = inputRef;
      const lastInteractive = selectedMovie ? buttonRef.current : inputRef;

      if (key === "Tab" && shiftKey && target === firstInteractive) {
        setExpanded(false);
      }

      if (key === "Tab" && !shiftKey && target === lastInteractive) {
        setExpanded(false);
      }

      if (key === "Escape" && !menuExpanded) {
        setExpanded(false);
        selectRef.current.blur();
      }
    },
    [selectedMovie, menuExpanded, selectRef.current, buttonRef.current]
  );

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
      <Overlay expanded={expanded} setExpanded={setExpanded} />
      <StyledForm
        expanded={expanded}
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
      >
        <Title expanded={expanded} />
        <Select
          id="review__select"
          value={selectedMovie}
          onChange={(movie) => setSelectedMovie(movie)}
          onFocus={() => setExpanded(true)}
          setMenuExpanded={setMenuExpanded}
          styles={{ backgroundColor: theme.bg.default, minHeight: 42 }}
          placeholder={`What did you watch today, ${firstName}?`}
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
            <Button ref={buttonRef} disabled={rating === 0} />
          </>
        )}
        <Loader loading={loading} />
      </StyledForm>
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
