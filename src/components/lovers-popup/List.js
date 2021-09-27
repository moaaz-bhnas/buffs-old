import { forwardRef, memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Item from "./Item";
import { rawList } from "../../utils/style";

const StyledList = styled.ul`
  ${rawList}
`;

const List = forwardRef(({ users }, ref) => {
  console.log("users: ", users);

  return (
    <StyledList>
      {users.map((user, index, array) => (
        <Item
          key={user._id}
          user={user}
          ref={index === array.length - 1 ? ref : null}
        />
      ))}
    </StyledList>
  );
});

List.propTypes = {
  users: PropTypes.array,
};

export default memo(List);
