import { memo } from "react";
import styled from "styled-components";
import { sizes } from "../../utils/style";

const Form = styled.form`
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.border.grey2};
  width: ${sizes.width.card};
  padding: 0.8em 1em;
  border-radius: ${sizes.borderRadius.default};
`;

const Review = () => {
  return <Form>Review</Form>;
};

export default memo(Review);
