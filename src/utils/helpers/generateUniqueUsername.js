import { connectToDatabase } from "../../db/dbConnect";

export default async function generateUniqueUsername(fullName) {
  const { db } = await connectToDatabase();
  const usersCollection = db.collection("users");

  let dashedLowerCasedName = fullName.replace(/\s+/g, "-").toLowerCase();

  const lastInsertedUserWithSimilarName =
    await findLastInsertedUserWithSimilarName(
      usersCollection,
      dashedLowerCasedName
    );

  const usernameIndex = lastInsertedUserWithSimilarName
    ? lastInsertedUserWithSimilarName.username.id + 1
    : 0;

  const usernameParts = {
    name: dashedLowerCasedName,
    index: usernameIndex,
  };

  const username = `${usernameParts.name}${
    usernameParts.index > 0 ? `-${usernameParts.index}` : ""
  }`;

  return { usernameParts, username };
}

const findLastInsertedUserWithSimilarName = async (usersCollection, name) => {
  try {
    const usersCursor = await usersCollection
      .find({ "username.name": name })
      .sort({ _id: -1 })
      .limit(1);
    var user = await usersCursor.next();
  } catch (error) {
    console.error(error);
  }

  return user;
};
