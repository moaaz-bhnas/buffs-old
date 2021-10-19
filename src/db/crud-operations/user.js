import { connectToDatabase } from "../dbConnect";
const { ObjectId } = require("mongodb");

/* Read --- */
export const readUser = async (username) => {
  const { db } = await connectToDatabase();

  try {
    const userCollection = db.collection("users");
    var user = await userCollection.findOne({ username });
  } catch (error) {
    console.error(error);
  }

  return user;
};

export const readUserById = async (id) => {
  const { db } = await connectToDatabase();

  try {
    const usersCollection = db.collection("users");
    var user = await usersCollection.findOne({ _id: ObjectId(id) });
  } catch (error) {
    console.error(error);
  }

  return user;
};

export const readUsers = async (usernames) => {
  const { db } = await connectToDatabase();

  try {
    const userCollection = db.collection("users");
    const usersCursor = await userCollection.find({
      username: { $in: usernames },
    });
    var users = await usersCursor.toArray();
  } catch (error) {
    console.error(error);
  }

  return users;
};

/* Update ---*/
export const updateUser_addReview = async ({ username, reviewId, session }) => {
  const { db } = await connectToDatabase();
  const usersCollection = db.collection("users");

  const options = session ? { session } : {};

  try {
    usersCollection.updateOne(
      { username },
      { $push: { reviews: reviewId } },
      options
    );
  } catch (error) {
    console.error(error);
  }
};

export const updateUser_removeReview = async ({
  username,
  reviewId,
  session,
}) => {
  const { db } = await connectToDatabase();
  const usersCollection = db.collection("users");

  const options = session ? { session } : {};

  try {
    await usersCollection.updateOne(
      { username },
      { $pull: { reviews: reviewId } },
      options
    );
  } catch (error) {
    console.error(error);
  }
};

export const updateUser_addLikedReview = async ({
  username,
  reviewId,
  session,
}) => {
  const { db } = await connectToDatabase();
  const users = db.collection("users");

  const options = session ? { session } : {};

  try {
    await users.updateOne(
      { username },
      { $push: { likedReviews: reviewId } },
      options
    );
  } catch (error) {
    console.error(error);
  }
};

export const updateUser_removeLikedReview = async ({
  username,
  reviewId,
  session,
}) => {
  const { db } = await connectToDatabase();
  const users = db.collection("users");

  const options = session ? { session } : {};

  try {
    await users.updateOne(
      { username },
      { $pull: { likedReviews: reviewId } },
      options
    );
  } catch (error) {
    console.error(error);
  }
};

export const updateUser_addUsername = async ({
  id,
  usernameParts,
  username,
}) => {
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
