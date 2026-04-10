export default class ApiResponse {
  /**
   * Success Response
   * @param {Object} res - Express response object
   * @param {Number} statusCode - HTTP status code (default: 200)
   * @param {String} message - Message to send
   * @param {Object|null} data - Response data
   */
  static success(res, statusCode = 200, message = "Success", data = null) {
    return res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
    });
  }

  /**
   * Error Response
   * @param {Object} res - Express response object
   * @param {Number} statusCode - HTTP status code (default: 500)
   * @param {String} message - Error message
   * @param {Object|null} errors - Validation or custom errors
   */
  static error(
    res,
    statusCode = 500,
    message = "Something went wrong",
    errors = null,
  ) {
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      errors: errors || null,
    });
  }
}
