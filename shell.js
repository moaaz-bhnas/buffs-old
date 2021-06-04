db.createCollection("reviews", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "movieId", "rating", "review", "postingDate"],
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
        review: {
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
});

db.createCollection("movies", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "tmdbId",
        "name",
        "backdrop",
        "genre",
        "cast",
        "directors",
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
        backdrop: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        genres: {
          bsonType: "array",
          description: "must be an array and is required",
          items: {
            bsonType: "string",
            description: "must be a string and is required",
          },
        },
        cast: {
          bsonType: "array",
          description: "must be an array and is required",
          items: {
            bsonType: "string",
            description: "must be a string and is required",
          },
        },
        directors: {
          bsonType: "array",
          description: "must be an array and is required",
          items: {
            bsonType: "string",
            description: "must be a string and is required",
          },
        },
        imdbRating: {
          bsonType: "decimal",
          description: "must be a decimal and is required",
        },
      },
    },
  },
});
