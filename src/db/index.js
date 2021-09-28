import { connectToDatabase } from "./dbConnect";
const { ObjectId } = require("mongodb");

export const mergingPipeline = [
  {
    $lookup: {
      let: { userObjectId: { $toObjectId: "$userId" } },
      from: "users",
      pipeline: [
        {
          $match: { $expr: { $eq: ["$_id", "$$userObjectId"] } },
        },
        {
          $project: {
            name: 1,
            image: 1,
          },
        },
      ],
      as: "userDetails",
    },
  },
  {
    $lookup: {
      let: { movieObjectId: { $toObjectId: "$movieId" } },
      from: "movies",
      pipeline: [
        {
          $match: { $expr: { $eq: ["$_id", "$$movieObjectId"] } },
        },
        {
          $project: {
            name: 1,
            genres: "$genres.name",
            posterPath: 1,
            releaseYear: { $substrBytes: ["$releaseDate", 0, 4] },
          },
        },
      ],
      as: "movieDetails",
    },
  },
  { $unwind: "$userDetails" },
  { $unwind: "$movieDetails" },
  { $project: { userId: 0, movieId: 0 } },
];

// addMovie
export const addMovie = async (movie) => {
  // Add a field for reviews ids

  const { db } = await connectToDatabase();

  const movies = db.collection("movies");

  // Logic to prevent repeating movies
  const dbMovie = await movies.findOne({ tmdbId: movie.tmdbId });
  if (dbMovie) return dbMovie._id;

  const result = await movies.insertOne(movie);

  console.log(
    `${result.insertedCount} documents were inserted to movies collection with the _id: ${result.insertedId}`
  );

  return result.insertedId;
};

// addReview
export const addReview = async (review) => {
  const { db } = await connectToDatabase();

  // Add review document
  const reviews = db.collection("reviews");
  const result = await reviews.insertOne(review);

  // Update movie document's reviews array
  const movies = db.collection("movies");
  movies.updateOne(
    { _id: ObjectId(review.movieId) },
    { $push: { reviews: result.insertedId } }
  );

  // Update user document's reviews array
  const users = db.collection("users");
  users.updateOne(
    { _id: ObjectId(review.userId) },
    { $push: { reviews: result.insertedId } }
  );

  console.log(
    `${result.insertedCount} documents were inserted to reviews collection with the _id: ${result.insertedId}`
  );

  return result.insertedId;
};

// getReview (single)
export const getReview = async (id) => {
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

// getReviews
export const getReviews = async (skip, limit) => {
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
  } catch (err) {
    console.log(err);
  }

  return reviews;
};

// addLover
export const addLover = async (reviewId, userId) => {
  const { db } = await connectToDatabase();

  try {
    // Add liker to the review document
    const reviews = db.collection("reviews");
    var result = await reviews.updateOne(
      { _id: ObjectId(reviewId) },
      { $push: { lovers: userId } }
    );

    // Add liked review to user document
    const users = db.collection("users");
    users.updateOne(
      { _id: ObjectId(userId) },
      { $push: { likedReviews: reviewId } }
    );
  } catch (err) {
    console.log(err);
  }

  return result.modifiedCount;
};

// removeLover
export const removeLover = async (reviewId, userId) => {
  const { db } = await connectToDatabase();

  try {
    // Remove liker from the review document
    const reviews = db.collection("reviews");
    var result = await reviews.updateOne(
      { _id: ObjectId(reviewId) },
      { $pull: { lovers: userId } }
    );

    // Remove liked review from the user document
    const users = db.collection("users");
    users.updateOne(
      { _id: ObjectId(userId) },
      { $pull: { likedReviews: reviewId } }
    );
  } catch (err) {
    console.log(err);
  }

  return result.modifiedCount;
};

// getUsers
export const getUsers = async (ids) => {
  const { db } = await connectToDatabase();

  const objectIds = ids.map(ObjectId);
  try {
    const userCollection = db.collection("users");
    const usersCursor = await userCollection.find({ _id: { $in: objectIds } });
    var users = await usersCursor.toArray();
  } catch (err) {
    console.log(err);
  }

  return users;
};
