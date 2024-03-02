// errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).json(err?.message);

};

module.exports = errorMiddleware;
