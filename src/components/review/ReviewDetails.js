import { memo } from "react";
import ReactStars from "react-rating-stars-component";
import styled from "styled-components";
import Star from "../star/Star";

const Container = styled.div``;

const ReviewDetails = ({ rating }) => {
  console.log(rating);
  return (
    <Container>
      <ReactStars
        count={4}
        edit={false}
        filledIcon={<Star state="filled" />}
        emptyIcon={<Star state="filled" />}
      />
    </Container>
  );
};

export default memo(ReviewDetails);
