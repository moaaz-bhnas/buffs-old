import { memo } from "react";
import Link from "next/link";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "../avatar/Avatar";
import { rawLink } from "../../utils/style";
import formatDateForReview from "../../utils/helpers/formatDateForReview";
import ReviewActions from "../../containers/review-actions/ReviewActions";

const Row = styled.header`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.25rem;
  position: relative;
`;

const UsernameLink = styled.a`
  ${rawLink};
  font-weight: bold;
  margin-right: 0.75rem;
`;

const AvatarLink = styled.a`
  margin-right: 0.75rem;
`;

const ReviewDate = styled.time`
  color: ${({ theme }) => theme.text.grey};
  font-size: 0.9rem;
`;

const UserDetails = ({ userDetails, timestamp }) => {
  const { username, name, image } = userDetails;

  return (
    <Row>
      <Link passHref href={`/${username}`}>
        <AvatarLink>
          <Avatar image={image} size={40} />
        </AvatarLink>
      </Link>

      <Link passHref href={`/${username}`}>
        <UsernameLink>{name}</UsernameLink>
      </Link>

      <ReviewDate dateTime={timestamp}>
        {formatDateForReview(timestamp)}
      </ReviewDate>

      <ReviewActions />
    </Row>
  );
};

UserDetails.propTypes = {
  userDetails: PropTypes.object,
  timestamp: PropTypes.string,
};

export default memo(UserDetails);
