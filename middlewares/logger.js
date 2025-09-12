const winston = require('winston');
const expressWinston = require('express-winston');

// create the custom formatter for console logs
const messageFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ level, message, meta, timestamp }) =>
      // This format is great for console viewing
      `${timestamp} ${level}: ${message}`,
  ),
);

// Request logger
const requestLogger = expressWinston.logger({
  transports: [
    // Log requests to request.log file in JSON format
    new winston.transports.File({
      filename: 'request.log',
      format: winston.format.json(),
    }),
    // Also log requests to the console with the custom format
    new winston.transports.Console({
      format: messageFormat,
    }),
  ],
  format: winston.format.json(), // This will be used by default for transports that don't have a specific format
});

// Error logger
const errorLogger = expressWinston.errorLogger({
  transports: [
    // Log errors to error.log file in JSON format
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
