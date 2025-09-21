// Centralized error handler that catches all errors passed to next()
function errorHandler(err, req, res, next) {
  console.error(err); // log full error stack

  const statusCode = err.statusCode || 500; // default to 500
  const message = err.message || "An unexpected error occurred";

  res.status(statusCode).send({ message });
}

module.exports = errorHandler;
