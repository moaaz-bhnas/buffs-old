import { useCallback, useEffect, useState } from "react";
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
import LikersPopup from "../likers-popup/LikersPopup";
import ReviewForm from "../../containers/review-form/ReviewForm";
import Form from "../../containers/review-form/containers/DesktopEdit";
import ReviewActions from "../review-actions/ReviewActions";

const StyledReview = styled.li`
  margin-bottom: 1.25rem;

  @media screen and (max-width: ${mediaQueries.review.main}) {
    width: 100%;
  }
`;

const Article = styled.article`
  ${cardStyles}

  position: relative;

  @media screen and (max-width: ${mediaQueries.review.main}) {
    width: calc(100% + ${sizes.padding.pageSmall} + ${sizes.padding.pageSmall});
    border-right: none;
    border-left: none;
    margin-right: -${sizes.padding.pageSmall};
    margin-left: -${sizes.padding.pageSmall};
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;

  position: relative;
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
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [likeLoading, setLikeLoading] = useState(false);

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

  const deleteReview = useCallback(async () => {
    const { username } = session.user;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/review?reviewId=${reviewId}&movieId=${movieDetails._id}&username=${username}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const { deletedCount } = await res.json();
    console.log("deletedCount: ", deletedCount);
  });

  const toggleLiker = useCallback(async () => {
    console.log("likeLoading: ", likeLoading);
    if (likeLoading) return;

    setLikeLoading(true);

    const { username } = session.user;
    const liked = likers.includes(username);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/review`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: liked ? "unlike" : "like",
        data: { reviewId, username },
      }),
    });

    setLikeLoading(false);

    const { modifiedCount } = await res.json();
    console.log("modifiedCount: ", modifiedCount);
  }, [likers, likeLoading]);

  const showLikers = useCallback(async (usernames) => {
    const users = await getUsers(usernames);
    setLikersObjects(users);
  }, []);

  const hideLikers = useCallback(() => {
    setLikersObjects([]);
  }, []);

  return (
    <StyledReview>
      <Article>
        <Row>
          <UserDetails userDetails={userDetails} timestamp={timestamp} />

          <ReviewActions
            reviewId={reviewId}
            deleteReview={deleteReview}
            setEditModalVisible={setEditModalVisible}
          />
        </Row>

        <MovieDetails movieDetails={movieDetails} />

        <Hr />

        <ReviewDetails rating={rating} writeUp={writeUp} />

        <Hr />

        <ReactionBar
          toggleLiker={toggleLiker}
          likers={likers}
          likersObjects={likersObjects}
          liked={session && likers.includes(session.user.username)}
          showLikers={() => showLikers(likers)}
        />

        <Overlay expanded={likersObjects.length > 0} close={hideLikers} />

        {likersObjects.length > 0 && (
          <LikersPopup likersObjects={likersObjects} hideLikers={hideLikers} />
        )}

        {editModalVisible && (
          <ReviewForm
            editable
            reviewToEdit={{ reviewId, movieDetails, rating, writeUp }}
          >
            {(props) => (
              <Form {...props} setEditModalVisible={setEditModalVisible} />
            )}
          </ReviewForm>
        )}
      </Article>
    </StyledReview>
  );
};

Review.propTypes = {
  review: PropTypes.object,
};

export default Review;
