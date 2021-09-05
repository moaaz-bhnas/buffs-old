import { memo } from "react";
import Link from "next/link";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "../avatar/Avatar";
import { rawLink } from "../../utils/style";
import formatDateForReview from "../../utils/helpers/formatDateForReview";

const Row = styled.header`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.25rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const UsernameLink = styled.a`
  font-weight: bold;
  ${rawLink};
`;

const AvatarLink = styled.a`
  margin-right: 0.5rem;
`;

const ReviewDate = styled.time`
  color: ${({ theme }) => theme.text.grey};
  font-size: 0.9rem;
`;

const UserDetails = ({ userDetails, timestamp }) => {
  const { id, name, image } = userDetails;

  return (
    <Row>
      <Link passHref href={`/profile/${id}`}>
        <AvatarLink>
          <Avatar image={image} size={40} />
        </AvatarLink>
      </Link>

      <Column>
        <Link passHref href={`/profile/${id}`}>
          <UsernameLink>{name}</UsernameLink>
        </Link>
        <ReviewDate dateTime={timestamp}>
          {formatDateForReview(timestamp)}
        </ReviewDate>
      </Column>
    </Row>
  );
};

UserDetails.propTypes = {
  userDetails: PropTypes.object,
};

export default memo(UserDetails);
