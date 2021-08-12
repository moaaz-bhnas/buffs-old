import { memo } from "react";
import styled from "styled-components";
import ReturnButton from "../../../components/header/ReturnButton";
import Header from "../Header";

const Title = styled.h2`
  font-size: 1.2rem;
  margin: 0;
`;

const Returnable = ({ title }) => {
  return (
    <Header>
      <ReturnButton />
      <Title>{title}</Title>
    </Header>
  );
};

export default memo(Returnable);
