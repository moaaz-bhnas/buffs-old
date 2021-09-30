export const mergingPipeline = [
  {
    $lookup: {
      let: { username: "$username" },
      from: "users",
      pipeline: [
        {
          $match: { $expr: { $eq: ["$username", "$$username"] } },
        },
        {
          $project: {
            _id: 0,
            username: 1,
            name: 1,
            image: 1,
          },
        },
      ],
      as: "userDetails",
    },
  },
  {
    $lookup: {
      let: { movieObjectId: { $toObjectId: "$movieId" } },
      from: "movies",
      pipeline: [
        {
          $match: { $expr: { $eq: ["$_id", "$$movieObjectId"] } },
        },
        {
          $project: {
            name: 1,
            genres: "$genres.name",
            posterPath: 1,
            releaseYear: { $substrBytes: ["$releaseDate", 0, 4] },
          },
        },
      ],
      as: "movieDetails",
    },
  },
  { $unwind: "$userDetails" },
  { $unwind: "$movieDetails" },
  { $project: { username: 0, movieId: 0 } },
];
