import styled from "styled-components";
import { sizes, transitions } from "../../utils/style";
import Icon from "./Icon";

const generateButton = (Component, props, icon) => {
  const { type = "button", children, ...rest } = props;

  return (
    <Component type={type} {...rest}>
      {icon && <Icon icon={icon} />}
      {children}
    </Component>
  );
};

const StyledButton = styled.button`
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  transition: opacity ${transitions.bg.default};
`;

const StyledAuthButton = styled(StyledButton)`
  color: #fff;
  font-weight: 500;
  padding: 0.75em 1em;
  border: none;
  border-radius: ${sizes.borderRadius.default};

  display: flex;

  &:hover,
  &:focus {
    opacity: 0.8;
  }
`;

const StyledTwitterButton = styled(StyledAuthButton)`
  background-color: ${({ theme }) => theme.bg.twitter};
`;

export const Button = (props) => generateButton(StyledButton, props);

export const TwitterButton = (props) =>
  generateButton(StyledTwitterButton, props, "/images/twitter.svg");
