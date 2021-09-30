import { readUsers } from "../../../db/crud-functions/user";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      const { usernames } = req.query;

      try {
        const users = await readUsers(usernames.split(","));

        res.status(201).json({ success: true, users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
}
