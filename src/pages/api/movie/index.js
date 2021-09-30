import { createMovie } from "../../../db/crud-functions/movie";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const documentId = await createMovie(req.body);

        res.status(201).json({ success: true, documentId });
      } catch (error) {
        res.status(400).json({ success: false });
      }
  }
}
