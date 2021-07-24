import { connectToDatabase } from "./dbConnect";

export const addMovie = async (movie) => {
  const { db } = await connectToDatabase();

  const movies = db.collection("movies");
  const result = await movies.insertOne(movie);

  console.log(
    `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
  );

  return result;
};

// addReview
export const addReview = async (review) => {
  const { db } = await connectToDatabase();

  const reviews = db.collection("reviews");
  const result = await reviews.insertOne(review);

  console.log(
    `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
  );

  return result;
};
