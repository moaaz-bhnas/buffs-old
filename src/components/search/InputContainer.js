import { memo } from "react";
import styled from "styled-components";
import Icon from "./Icon";
import Input from "./Input";
import PropTypes from "prop-types";

const Container = styled.label`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;

const InputContainer = ({ active, setActive }) => {
  return (
    <Container onClick={() => setActive(true)}>
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
