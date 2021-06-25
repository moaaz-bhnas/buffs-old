import { memo } from "react";
import styled from "styled-components";
import Image from "next/image";
import PropTypes from "prop-types";

const StyledIcon = styled.div`
  margin-right: 1rem;
`;

const Icon = ({ icon }) => {
  return (
    <StyledIcon>
      <Image
        src={icon}
        alt=""
        width={20}
        height={20}
        quality={100}
        priority={true}
      />
    </StyledIcon>
  );
};

Icon.propTypes = {
  icon: PropTypes.string,
};

export default memo(Icon);
