import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Svg = styled.svg``;

const Path = styled.path``;

const Home = ({ title = "inbox", className = "svg" }) => {
  return (
    <Svg
      title={title}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-50 -50 612.001 612.001"
    >
      <Path
        d="M9.47,192.489c-5.539,2.215-9.248,7.49-9.461,13.451c-0.212,5.963,3.115,11.488,8.482,14.09l176.547,85.623L490.696,0.002
        L9.47,192.489z"
      />
      <Path
        d="M206.344,326.96l85.624,176.548c2.525,5.206,7.798,8.491,13.552,8.491c0.179,0,0.357-0.003,0.538-0.01
        c5.962-0.212,11.237-3.921,13.453-9.46L512.001,21.306L206.344,326.96z"
      />
    </Svg>
  );
};

Home.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

export default memo(Home);
