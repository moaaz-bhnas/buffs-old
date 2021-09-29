import { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes, { func } from "prop-types";
import MovieDetails from "../../components/review/BarMovieDetails";
import { cardStyles, mediaQueries, sizes } from "../../utils/style";
import ReviewDetails from "../../components/review/BarReviewDetails";
import UserDetails from "../../components/review/BarUserDetails";
import ReactionBar from "../../components/review/BarReaction";
import { useSession } from "next-auth/client";
import getUsers from "../../utils/helpers/getUsers";
import Overlay from "../../components/overlay/Overlay";
import LikersPopup from "../likers-popup/LikersPopup";

const StyledReview = styled.li`
  margin-bottom: 1.25rem;

  @media screen and (max-width: ${mediaQueries.review.main}) {
    width: 100%;
  }
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
    likers,
  } = review;
  const [session] = useSession();

  const [likersObjects, setLikersObjects] = useState([]);

  useEffect(
    function preventScrollingOnPopup() {
      if (likersObjects.length) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "initial";
      }
    },
    [likersObjects]
  );

  const toggleLiker = useCallback(async () => {
    const userId = session.user.id;
    const liked = likers.includes(session.user.id);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/review`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: liked ? "unlike" : "like",
        data: { reviewId, userId },
      }),
    });

    const { modifiedCount } = await res.json();
    console.log("modifiedCount: ", modifiedCount);
  }, [likers]);

  const showLikers = useCallback(async (ids) => {
    const users = await getUsers(ids);
    setLikersObjects(users);
  }, []);

  const hideLikers = useCallback(() => {
    setLikersObjects([]);
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
          toggleLiker={toggleLiker}
          likers={likers}
          likersObjects={likersObjects}
          liked={session && likers.includes(session.user.id)}
          showLikers={() => showLikers(likers)}
        />

        <Overlay expanded={likersObjects.length > 0} close={hideLikers} />

        {likersObjects.length > 0 && (
          <LikersPopup likersObjects={likersObjects} hideLikers={hideLikers} />
        )}
      </Article>
    </StyledReview>
  );
};

Review.propTypes = {
  review: PropTypes.object,
};

export default Review;
