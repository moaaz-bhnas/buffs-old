import { connectToDatabase } from "./dbConnect";
const { ObjectId } = require("mongodb");

export const mergingPipeline = [
  {
    $lookup: {
      let: { username: "$username" },
      from: "users",
      pipeline: [
        {
          $match: { $expr: { $eq: ["$username", "$$username"] } },
        },
        {
          $project: {
            _id: 0,
            username: 1,
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
  { $project: { username: 0, movieId: 0 } },
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

  try {
    // Add review document
    const reviews = db.collection("reviews");
    var result = await reviews.insertOne(review);

    // Update movie document's reviews array
    const movies = db.collection("movies");
    movies.updateOne(
      { _id: ObjectId(review.movieId) },
      { $push: { reviews: result.insertedId } }
    );

    // Update user document's reviews array
    const users = db.collection("users");
    users.updateOne(
      { username: review.username },
      { $push: { reviews: result.insertedId } }
    );
  } catch (error) {
    console.error(error);
  }

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
export const getReviews = async ({ skip, limit }) => {
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

// getUserReviews
export const getUserReviews = async ({ username, skip = 0, limit = 20 }) => {
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
  } catch (err) {
    console.error(err);
  }

  return reviews;
};

// addLiker
export const addLiker = async (reviewId, username) => {
  const { db } = await connectToDatabase();

  try {
    // Add liker to the review document
    const reviews = db.collection("reviews");
    var result = await reviews.updateOne(
      { _id: ObjectId(reviewId) },
      { $push: { likers: username } }
    );

    // Add liked review to user document
    const users = db.collection("users");
    users.updateOne({ username }, { $push: { likedReviews: reviewId } });
  } catch (err) {
    console.log(err);
  }

  return result.modifiedCount;
};

// removeLiker
export const removeLiker = async (reviewId, username) => {
  const { db } = await connectToDatabase();

  try {
    // Remove liker from the review document
    const reviews = db.collection("reviews");
    var result = await reviews.updateOne(
      { _id: ObjectId(reviewId) },
      { $pull: { likers: username } }
    );

    // Remove liked review from the user document
    const users = db.collection("users");
    users.updateOne({ username }, { $pull: { likedReviews: reviewId } });
  } catch (err) {
    console.log(err);
  }

  return result.modifiedCount;
};

// getUsers
export const getUsers = async (usernames) => {
  const { db } = await connectToDatabase();

  try {
    const userCollection = db.collection("users");
    const usersCursor = await userCollection.find({
      username: { $in: usernames },
    });
    var users = await usersCursor.toArray();
  } catch (err) {
    console.log(err);
  }

  return users;
};

// Give user a username
export const updateUserWithUsername = async (id, usernameParts, username) => {
  const { db } = await connectToDatabase();

  try {
    const usersCollection = db.collection("users");
    var result = await usersCollection.updateOne(
      { _id: ObjectId(id) },
      { $set: { usernameParts, username } }
    );
  } catch (error) {
    console.error(error);
  }

  return result.modifiedCount;
};

// getUser
export const getUser = async (username) => {
  const { db } = await connectToDatabase();

  try {
    const userCollection = db.collection("users");
    var user = await userCollection.findOne({ username });
  } catch (err) {
    console.log(err);
  }

  return user;
};

export const getUsername = async (id) => {
  const { db } = await connectToDatabase();

  try {
    const usersCollection = db.collection("users");
    var user = await usersCollection.findOne({ _id: ObjectId(id) });
  } catch (error) {
    console.error(error);
  }

  return user.username;
};
