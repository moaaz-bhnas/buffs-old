import { MongoClient } from "mongodb";
import { getReview } from ".";
import pusher from "../lib/pusher";
import closeChangeStream from "../utils/helpers/closeChangeStream";

let changeStreamResumeToken = null;

const publishReviewsPusher = async (db, channel, pipline = []) => {
  const collection = db.collection(channel);
  const changeStream = collection.watch(pipline, {
    fullDocument: "updateLookup",
    resumeAfter: changeStreamResumeToken,
  });

  changeStream.on("change", async (change) => {
    console.log("change: ", change);
    changeStreamResumeToken = change._id;

    switch (change.operationType) {
      case "insert": {
        console.log("pusher - inserted");
        const document = await getReview(change.documentKey._id);
        pusher.trigger(channel, "inserted", document);
        break;
      }
      case "update": {
        const document = change.fullDocument;
        pusher.trigger(channel, "updated", document);
        break;
      }
    }
  });

  // await closeChangeStream({ changeStream });
};

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!MONGODB_DB) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      const db = client.db(MONGODB_DB);

      publishReviewsPusher(db, "reviews");

      return { client, db };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
