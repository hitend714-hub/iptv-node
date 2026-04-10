import ApiResponse from "../utils/ApiResponse.js";

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error("Error:", err.message);

  // IF MONGODB REQUIRED / VALIDATION ERROR
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return ApiResponse.error(res, 400, messages.join(", "));
  }

  // IF CastError (Invalid ObjectId)
  if (err.name === "CastError") {
    return ApiResponse.error(res, 400, "Invalid ID format");
  }

  // IF MONGODB DUPLICATE KEY
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];

    return ApiResponse.error(res, 409, `${field} already exists`, {
      field,
      value,
    });
  }

  // If it's an operational (AppError) — handle gracefully
  if (err.isOperational) {
    return ApiResponse.error(res, err.statusCode, err.message, err);
  }

  // Non-operational (unexpected) error
  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "development"
      ? err.message || "Internal Server Error"
      : "Something went wrong on the server.";

  return ApiResponse.error(res, statusCode, message, err);
};
