import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Header = styled.header``;

const UserName = styled.p``;

const UserDetails = ({ userDetails }) => {
  const { name } = userDetails;
  console.log("userDetails: ", userDetails);

  return (
    <Header>
      <UserName>{name}</UserName>
    </Header>
  );
};

UserDetails.propTypes = {
  userDetails: PropTypes.object,
};

export default memo(UserDetails);
