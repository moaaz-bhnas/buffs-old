import { addReview, getReviews } from "../../../db";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const result = await addReview(req.body);

        res.status(201).json({ success: true, data: result });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "GET":
      const { skip, limit } = req.query;

      try {
        const results = await getReviews(skip, limit);

        res.status(201).json({ success: true, data: results });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
}
