import { connectToDatabase } from "./dbConnect";

// addMovie
export const addMovie = async (movie) => {
  const { db } = await connectToDatabase();

  const movies = db.collection("movies");
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
export const getReviews = async (offset) => {
  const { db } = await connectToDatabase();

  const reviews = db.collection("reviews");

  const pipeline = [
    {
      $sort: {
        _id: -1,
      },
    },
    {
      $limit: 20,
    },
    {
      $lookup: {
        from: "movies",
        let: { movieObjectId: { $toObjectId: "$movieId" } },
        pipeline: [
          {
            $match: { $expr: { $eq: ["$_id", "$$movieObjectId"] } },
          },
          {
            $project: {
              name: 1,
              genres: 1,
              posterPath: 1,
            },
          },
          // { 
          //   $unwind: "$genres",
          // },
        ],
        as: "movieDetails",
      },
    },
  ];

  // const results = reviews.aggregate([$sort]);
};
