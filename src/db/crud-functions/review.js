import { connectToDatabase } from "../dbConnect";
const { ObjectId } = require("mongodb");
import { updateMovie_addReview } from "./movie";
import {
  updateUser_addLikedReview,
  updateUser_removeLikedReview,
  updateUser_addReview,
} from "./user";
import { mergingPipeline } from "../utils";

/* Create --- */
export const createReview = async (review) => {
  const { db } = await connectToDatabase();
  const reviews = db.collection("reviews");

  try {
    // Add review document
    var result = await reviews.insertOne(review);

    // Update movie document's reviews array
    updateMovie_addReview({
      movieId: review.movieId,
      reviewId: result.insertedId,
    });

    // Update user document's reviews array
    updateUser_addReview({
      username: review.username,
      reviewId: result.insertedId,
    });
  } catch (error) {
    console.error(error);
  }

  console.log(
    `${result.insertedCount} documents were inserted to reviews collection with the _id: ${result.insertedId}`
  );

  return result.insertedId;
};

/* Read --- */
export const readReview = async (id) => {
  const { db } = await connectToDatabase();

  const pipeline = [{ $match: { _id: ObjectId(id) } }, ...mergingPipeline];

  const reviewsCollection = db.collection("reviews");

  try {
    const reviewsCursor = await reviewsCollection.aggregate(pipeline);
    var review = await reviewsCursor.next();
  } catch (err) {
    console.log(err);
  }

  return review;
};

export const readReviews = async ({ skip = 0, limit = 20 }) => {
  const { db } = await connectToDatabase();

  const reviewsCollection = db.collection("reviews");

  const pipeline = [
    { $sort: { _id: -1 } },
    { $skip: Number(skip) },
    { $limit: Number(limit) },
    ...mergingPipeline,
  ];

  try {
    const reviewsCursor = await reviewsCollection.aggregate(pipeline);
    var reviews = await reviewsCursor.toArray();
  } catch (error) {
    console.error(error);
  }

  return reviews;
};

export const readUserReviews = async ({ username, skip = 0, limit = 20 }) => {
  const { db } = await connectToDatabase();

  const pipeline = [
    { $match: { username } },
    { $project: { reviews: 1 } },
    { $unwind: "$reviews" },
    {
      $lookup: {
        from: "reviews",
        localField: "reviews",
        foreignField: "_id",
        as: "reviewsObjects",
      },
    },
    { $unwind: "$reviewsObjects" },
    {
      $project: {
        _id: "$reviewsObjects._id",
        username: "$reviewsObjects.username",
        movieId: "$reviewsObjects.movieId",
        rating: "$reviewsObjects.rating",
        writeUp: "$reviewsObjects.writeUp",
        likers: "$reviewsObjects.likers",
        timestamp: "$reviewsObjects.timestamp",
      },
    },
    ...mergingPipeline,
  ];

  try {
    const userCollection = db.collection("users");
    const cursor = await userCollection.aggregate(pipeline);
    var reviews = await cursor.toArray();
  } catch (error) {
    console.error(error);
  }

  return reviews;
};

/* Update --- */
export const updateReview_addLiker = async ({ reviewId, username }) => {
  const { db } = await connectToDatabase();

  try {
    // Add liker to the review document
    const reviews = db.collection("reviews");
    var result = await reviews.updateOne(
      { _id: ObjectId(reviewId) },
      { $push: { likers: username } }
    );

    // Add liked review to user document
    updateUser_addLikedReview({ username, reviewId });
  } catch (err) {
    console.log(err);
  }

  return result.modifiedCount;
};

export const updateReview_removeLiker = async ({ reviewId, username }) => {
  const { db } = await connectToDatabase();

  try {
    // Add liker to the review document
    const reviews = db.collection("reviews");
    var result = await reviews.updateOne(
      { _id: ObjectId(reviewId) },
      { $pull: { likers: username } }
    );

    // Add liked review to user document
    updateUser_removeLikedReview({ username, reviewId });
  } catch (err) {
    console.log(err);
  }

  return result.modifiedCount;
};
