import { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Item from "./Item";
import { rawList } from "../../utils/style";

const StyledList = styled.ul`
  ${rawList}
`;

const List = ({ users }) => {
  console.log("users: ", users);

  return (
    <StyledList>
      {users.map((user) => (
        <Item key={user._id} user={user} />
      ))}
    </StyledList>
  );
};

List.propTypes = {
  users: PropTypes.array,
};

export default memo(List);
