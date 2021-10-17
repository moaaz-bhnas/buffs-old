import styled from "styled-components";
import { rawButton, sizes, transitions } from "../../utils/style";

export const Button = styled.button`
  ${rawButton}

  width: 100%;
  padding: 0.6rem;
  border-radius: ${sizes.borderRadius.default};
  text-align: left;

  font-weight: 500;

  transition: background-color ${transitions.bg.default};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.bg.grey1};
  }
`;
