/**
 * Wrap async route handlers to catch errors
 * and forward them to Express error middleware.
 *
 * Usage:
 *   router.get("/", catchAsync(async (req, res) => { ... }));
 */
export default function catchAsync(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
