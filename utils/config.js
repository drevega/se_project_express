// declare JWT_SECRET contains a value of your secret key for the signature.
const { JWT_SECRET = "super-strong-secret" } = process.env;

module.exports = {
  JWT_SECRET,
};
