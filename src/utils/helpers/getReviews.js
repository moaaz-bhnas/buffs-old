export default async function getReviews({ skip, limit }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/review?skip=${skip}&limit=${limit}`,
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
