import { Schema, model } from "mongoose";

const schema = new Schema({
  username: {
    type: String,
    // ref: "User",
    required: [true, "Please add a username"],
  },
  tmdbId: {
    type: String,
    required: [true, "Please add the movie id"],
  },
  rating: {
    type: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    required: [true, "Please add a rating"],
  },
  writeUp: {
    type: String,
    default: "",
  },
  likers: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = model("Review", schema);

export default Review;
