import Image from "next/image";
import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { mediaQueries, rawButton } from "../../utils/style";

const Button = styled.button`
  display: none;
  @media screen and (max-width: ${mediaQueries.main}) {
    display: ${(props) => props.formActive && "block"};
    ${rawButton};
    margin-right: 1em;
  }
`;

const BackButton = ({ formActive, setFormActive }) => {
  return (
    <Button
      type="button"
      formActive={formActive}
      onClick={() => setFormActive(false)}
    >
      <Image
        src="/images/back.svg"
        alt="Close search form"
        width={20}
        height={20}
        quality={100}
        layout="fixed"
      />
    </Button>
  );
};

BackButton.propTypes = {
  formActive: PropTypes.bool,
  setFormActive: PropTypes.func,
};

export default memo(BackButton);
