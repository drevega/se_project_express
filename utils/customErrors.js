// custom Error Constructors

const createError = (name, statusCode) => (message) => {
  const error = new Error(message);
  error.name = name;
  error.statusCode = statusCode;
  return error;
};

module.exports = {
  BadRequestError: createError("BadRequestError", 400),
  UnauthorizedError: createError("UnauthorizedError", 401),
  ForbiddenError: createError("ForbiddenError", 403),
  NotFoundError: createError("NotFoundError", 404),
  ConflictError: createError("ConflictError", 409),
};
