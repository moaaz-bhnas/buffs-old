import { memo, useCallback, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import MovieDetails from "../../components/review/BarMovieDetails";
import { cardStyles, mediaQueries, sizes } from "../../utils/style";
import ReviewDetails from "../../components/review/BarReviewDetails";
import UserDetails from "../../components/review/BarUserDetails";
import ReactionBar from "../../components/review/BarReaction";
import { useSession } from "next-auth/client";
import getUsers from "../../utils/helpers/getUsers";
import Overlay from "../../components/overlay/Overlay";
import LoversPopup from "../lovers-popup/LoversPopup";

const StyledReview = styled.li`
  margin-bottom: 1.25rem;
  width: 100%;
`;

const Article = styled.article`
  ${cardStyles}

  @media screen and (max-width: ${mediaQueries.review.main}) {
    width: calc(100% + ${sizes.padding.pageSmall} + ${sizes.padding.pageSmall});
    border-right: none;
    border-left: none;
    margin-right: -${sizes.padding.pageSmall};
    margin-left: -${sizes.padding.pageSmall};
  }
`;

const Hr = styled.hr`
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.bg.grey2};
  margin: 1rem 0;
`;

const Review = ({ review }) => {
  const {
    _id: reviewId,
    userDetails,
    movieDetails,
    rating,
    writeUp,
    timestamp,
    lovers,
  } = review;
  const [session] = useSession();

  const [loversObjects, setLoversObjects] = useState([]);

  const toggleLover = useCallback(async () => {
    const userId = session.user.id;
    const loved = lovers.includes(session.user.id);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/review`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: loved ? "unlove" : "love",
        data: { reviewId, userId },
      }),
    });

    const { modifiedCount } = await res.json();
    console.log("modifiedCount: ", modifiedCount);
  }, [lovers]);

  const showLovers = useCallback(async (ids) => {
    const users = await getUsers(ids);
    setLoversObjects(users);
  }, []);

  const hideLovers = useCallback(() => {
    setLoversObjects([]);
  }, []);

  return (
    <StyledReview>
      <Article>
        <UserDetails userDetails={userDetails} timestamp={timestamp} />

        <MovieDetails movieDetails={movieDetails} />

        <Hr />

        <ReviewDetails rating={rating} writeUp={writeUp} />

        <Hr />

        <ReactionBar
          toggleLover={toggleLover}
          lovers={lovers}
          loversObjects={loversObjects}
          loved={session && lovers.includes(session.user.id)}
          showLovers={() => showLovers(lovers)}
        />

        <Overlay expanded={loversObjects.length > 0} close={hideLovers} />

        {loversObjects.length > 0 && (
          <LoversPopup loversObjects={loversObjects} hideLovers={hideLovers} />
        )}
      </Article>
    </StyledReview>
  );
};

Review.propTypes = {
  review: PropTypes.object,
};

export default Review;
