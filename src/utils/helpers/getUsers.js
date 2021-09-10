// getUsers
export default async function getUsers(ids) {
  const res = await fetch(
    `http://localhost:3000/api/user?ids=${ids.join(",")}`,
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
