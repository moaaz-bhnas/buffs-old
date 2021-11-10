import { readUsers } from "../../../db/crud-operations/user";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      const { usernames, preview } = req.query;

      try {
        const users = await readUsers({
          usernames: usernames.split(","),
          preview,
        });

        res.status(201).json({ success: true, users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
}
