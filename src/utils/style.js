import { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 1rem;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: #333;
    background-color: #faf9f7;
    margin: 0;
    padding: 0;
  }
`;

export const theme = {
  text: {
    default: "#333",
    brand: "#1f70e6",
    grey: "#737373",
  },
  bg: {
    default: "#F0F2F5",
    header: "#fff",
    grey2: "#d8dadd",
    grey3: "#c8c7c6",
    grey4: "#727274",
    dark: "#333",
    twitter: "#0D91E3",
  },
  border: {
    grey2: "#d8dadd",
    dark: "#333",
  },
  icon: {
    default: "#606266",
    bottomLight: "#777677",
    bottomDark: "#333",
  },
};

export const fonts = {
  serif:
    "Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
  sansSerif:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
};

export const sizes = {
  maxWidth: {
    default: "60em",
  },
  borderRadius: {
    default: "3px",
  },
  width: {
    card: "30em",
  },
  height: {
    header: "3.7em",
  },
};

export const mediaQueries = {
  main: "768px",
};

export const transitions = {
  opacity: {
    default: ".3s",
  },
  bg: {
    default: ".1s",
  },
  stroke: {
    default: ".1s",
  },
};

export const shadows = {
  card: {
    default: "0 1px 2px rgba(0, 0, 0, 0.2)",
  },
  cover: {
    default: "0 0 5px rgba(0, 0, 0, 0.2)",
  },
  input: {
    success: "0 0 0 2px rgb(73, 175, 65, 1)",
  },
};

export const overlays = {
  review: {
    default: "rgba(255, 255, 255, .85)",
  },
};

export const linkStyles = css`
  color: inherit;
  text-decoration: none;
  font-weight: 500;
`;

export const containerStyles = css`
  max-width: ${sizes.maxWidth.default};
  margin-left: auto;
  margin-right: auto;
  padding-left: 1em;
  padding-right: 1em;
`;

export const rawButton = css`
  font-size: 1rem;
  font-family: inherit;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const rawList = css`
  list-style: none;
  margin: 0;
  padding-left: 0;
`;

export const rawLink = css`
  text-decoration: none;
  color: inherit;
`;

export const inputStyles = css`
  font-size: 1rem;
  border-radius: ${sizes.borderRadius.default};
  background-color: ${({ theme }) => theme.bg.default};

  &::placeholder {
    color: ${({ theme }) => theme.text.grey};
    font-size: 0.95rem;
  }

  &:focus {
    &::placeholder {
      color: #999;
    }
  }
`;

export const offScreen = css`
  position: absolute;
  left: -200rem;
`;
