export default async function getReviews({ skip, limit }) {
  const res = await fetch(
    `http://localhost:3000/api/review?skip=${skip}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const { data } = await res.json();
  return data;
}
