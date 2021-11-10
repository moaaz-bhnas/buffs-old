// getUsers
export default async function getUsers({ usernames, preview }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user?usernames=${usernames.join(
      ","
    )}&preview=${preview}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const { users } = await res.json();
  return users;
}
