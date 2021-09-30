import { connectToDatabase } from "../dbConnect";
const { ObjectId } = require("mongodb");

/* Create --- */
export const createMovie = async (movie) => {
  const { db } = await connectToDatabase();
  const moviesCollection = db.collection("movies");

  try {
    // Logic to prevent repeating movies
    const dbMovie = await moviesCollection.findOne({ tmdbId: movie.tmdbId });
    if (dbMovie) return dbMovie._id;

    var result = await moviesCollection.insertOne(movie);
  } catch (error) {
    console.error(error);
  }

  console.log(
    `${result.insertedCount} documents were inserted to movies collection with the _id: ${result.insertedId}`
  );

  return result.insertedId;
};

/* Update --- */
export const updateMovie_addReview = async ({ movieId, reviewId }) => {
  const { db } = await connectToDatabase();
  const moviesCollection = db.collection("movies");

  try {
    moviesCollection.updateOne(
      { _id: ObjectId(movieId) },
      { $push: { reviews: reviewId } }
    );
  } catch (error) {
    console.error(error);
  }
};
