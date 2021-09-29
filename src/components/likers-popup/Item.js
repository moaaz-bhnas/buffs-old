import { forwardRef, memo } from "react";
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

const Item = forwardRef(({ user }, ref) => {
  const { username, name, image } = user;

  return (
    <StyledItem>
      <Link passHref href={`/${username}`}>
        <AvatarLink>
          <Avatar image={image} size={40} />
        </AvatarLink>
      </Link>
      <Link passHref href={`/${username}`}>
        <UsernameLink ref={ref}>{name}</UsernameLink>
      </Link>
    </StyledItem>
  );
});

Item.propTypes = {
  user: PropTypes.object,
};

export default memo(Item);
// not finished: add follow button
