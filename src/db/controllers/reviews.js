import Review from "../models/Review";

// @desc      Get all reviews
// @route     GET /api/reviews
// @access    Public
export async function getReviews(req, res) {
  // Fields to exclude
  const reservedParams = ["sort", "page", "limit"];

  // Remove reserved words from query
  const formattedQuery = (function removeReservedParams() {
    const queryCopy = { ...req.query };
    reservedParams.forEach((param) => delete queryCopy[param]);
    return queryCopy;
  })();

  // Build query
  let query = Review.find(formattedQuery);

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy); // e.g. .sort(-name)
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  query = query.skip(startIndex).limit(limit);
  const reviews = await query;

  // Pagination: next, prev
  const pagination = {};

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  const total = await Review.countDocuments();
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews,
    pagination,
  });
}

// @desc      Get a single review
// @route     GET /api/reviews/:id
// @access    Public
export async function getReview(req, res) {
  const { id } = req.params;

  const review = await Review.findById(id);

  if (!review) {
    return res.status(404).json({
      success: false,
      error: `Review not found with id: ${id}`,
    });
  }

  res.status(200).json({
    success: true,
    data: review,
  });
}

// @desc      Create a review
// @route     POST /api/review
// @access    Private: authenticated users
export async function createReview(req, res) {}