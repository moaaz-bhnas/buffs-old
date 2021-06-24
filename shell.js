db.runCommand({
  collMod: "movies",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "tmdbId",
        "name",
        "posterPath",
        "genres",
        "cast",
        "director",
        "imdbRating",
      ],
      properties: {
        tmdbId: {
          bsonType: "int",
          description: "must be an integer of 3 digits and is required",
        },
        name: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        posterPath: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        genres: {
          bsonType: "array",
          description: "must be an array and is required",
        },
        cast: {
          bsonType: "array",
          description: "must be an array and is required",
        },
        director: {
          bsonType: "object",
          description: "must be an object and is required",
        },
        imdbRating: {
          bsonType: "decimal",
          description: "must be a decimal and is required",
        },
      },
    },
  },
  validationAction: "warn",
  validationLevel: "moderate",
});

db.runCommand({
  collMod: "reviews",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "movieId", "rating", "writeUp", "postingDate"],
      properties: {
        userId: {
          bsonType: "objectId",
          description: "must be an object id and is required",
        },
        movieId: {
          bsonType: "objectId",
          description: "must be an object id and is required",
        },
        rating: {
          bsonType: "decimal",
          description: "must be a decimal and is required",
        },
        writeUp: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        postingDate: {
          bsonType: "date",
          description: "must be a date and is required",
        },
      },
    },
  },
  validationAction: "warn",
  validationLevel: "moderate",
});
