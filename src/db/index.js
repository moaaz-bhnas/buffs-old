import { connectToDatabase } from "./dbConnect";

// addMovie
export const addMovie = async (movie) => {
  const { db } = await connectToDatabase();

  const movies = db.collection("movies");

  // Logic to prevent repeating movies

  const result = await movies.insertOne(movie);

  console.log(
    `${result.insertedCount} documents were inserted to movies collection with the _id: ${result.insertedId}`
  );

  return result;
};

// addReview
export const addReview = async (review) => {
  const { db } = await connectToDatabase();

  const reviews = db.collection("reviews");
  const result = await reviews.insertOne(review);

  console.log(
    `${result.insertedCount} documents were inserted to reviews collection with the _id: ${result.insertedId}`
  );

  return result;
};

// getReviews
export const getReviews = async (skip, limit) => {
  const { db } = await connectToDatabase();

  const reviewsCollection = db.collection("reviews");

  const pipeline = [
    { $sort: { _id: -1 } },
    { $skip: Number(skip) },
    { $limit: Number(limit) },
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

  try {
    const reviewsCursor = await reviewsCollection.aggregate(pipeline);
    var reviews = await reviewsCursor.toArray();
  } catch (err) {
    console.log(err);
  }

  return reviews;
};
