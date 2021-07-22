import { memo } from "react";
import styled, { css } from "styled-components";
import Icon from "./Icon";
import Input from "./Input";
import PropTypes from "prop-types";
import { sizes } from "../../utils/style";

const Container = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.border.grey2};
  border-radius: ${sizes.borderRadius.default};
  width: ${({ active }) => (active ? "20rem" : "16rem")};
  background-color: ${({ theme }) => theme.bg.default};

  transition: width 0.3s;
`;

const InputContainer = ({ active, setActive }) => {
  return (
    <Container active={active} onClick={() => setActive(true)}>
      <Icon active={active} />
      <Input active={active} setActive={setActive} />
    </Container>
  );
};

Input.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
};

export default memo(InputContainer);
