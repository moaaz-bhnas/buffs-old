import { memo } from "react";
import Link from "next/link";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "../avatar/Avatar";
import { rawLink } from "../../utils/style";

const StyledItem = styled.li`
  display: flex;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const AvatarLink = styled.a`
  margin-right: 0.75rem;
`;

const UsernameLink = styled.a`
  ${rawLink};
  font-weight: 500;
`;

const Item = ({ user }) => {
  const { _id, name, image } = user;

  return (
    <StyledItem>
      <Link passHref href={`/profile/${_id}`}>
        <AvatarLink>
          <Avatar image={image} size={40} />
        </AvatarLink>
      </Link>
      <Link passHref href={`/profile/${_id}`}>
        <UsernameLink>{name}</UsernameLink>
      </Link>
    </StyledItem>
  );
};

Item.propTypes = {
  user: PropTypes.object,
};

export default memo(Item);
// not finished: add follow button
