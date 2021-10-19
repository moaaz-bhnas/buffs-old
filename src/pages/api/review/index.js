import {
  createReview,
  readReviews,
  updateReview,
  updateReview_addLiker,
  updateReview_removeLiker,
} from "../../../db/crud-operations/review";

const update = async (type, data) => {
  switch (type) {
    case "default": {
      // data: { reviewId, rating, writeUp }
      const modifiedCount = await updateReview(data);
      return modifiedCount;
    }
    case "like": {
      const { reviewId, username } = data;
      const modifiedCount = await updateReview_addLiker({
        reviewId,
        username,
      });
      return modifiedCount;
    }
    case "unlike": {
      const { reviewId, username } = data;
      const modifiedCount = await updateReview_removeLiker({
        reviewId,
        username,
      });
      return modifiedCount;
    }
  }
};

export default async function handler(req, res) {
  const { method } = req;
  console.log("req.body: ", req.body);

  switch (method) {
    case "POST":
      try {
        const documentId = await createReview(req.body);

        res.status(201).json({ success: true, documentId });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "GET":
      const { skip, limit } = req.query;

      try {
        const results = await readReviews(skip, limit);

        res.status(201).json({ success: true, data: results });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      const { type, data } = req.body;

      try {
        const modifiedCount = await update(type, data);

        res.status(200).json({ success: true, modifiedCount });
      } catch (err) {
        res.status(400).json({ success: false });
      }
  }
}
