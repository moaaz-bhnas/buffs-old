import { memo, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { mediaQueries } from "../../utils/style";
import BackButton from "../../components/search/BackButton";
import Dropdown from "../../components/search/Dropdown";
import InputContainer from "../../components/search/InputContainer";

const StyledForm = styled.form`
  margin-right: auto;
  padding: 0 1em;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;

  @media screen and (max-width: ${mediaQueries.header}) {
    display: none;
  }
`;

const Form = () => {
  const formRef = useRef(null);
  const [active, setActive] = useState(false);

  const handleKeyDown = useCallback(({ key }) => {
    if (key === "Escape") {
      setActive(false);
    }
    if (key === "Enter" || key === " ") {
      setActive(true);
    }
  }, []);

  const handleClickOutside = useCallback(
    ({ target }) => {
      if (!formRef.current.contains(target)) {
        setActive(false);
      }
    },
    [formRef.current]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [formRef.current]);

  return (
    <StyledForm
      onKeyDown={handleKeyDown}
      ref={formRef}
      onSubmit={(event) => event.preventDefault()}
    >
      <BackButton formActive={active} setFormActive={setActive} />
      <InputContainer active={active} setActive={setActive} />
      {active && <Dropdown />}
    </StyledForm>
  );
};

export default memo(Form);
