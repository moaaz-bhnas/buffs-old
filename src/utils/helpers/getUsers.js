// getUsers
export default async function getUsers(usernames) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user?usernames=${usernames.join(
      ","
    )}`,
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
