require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.loginRequired = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, proces.env.SECRET_KEY, (err, decoded) => {
      if (decoded) {
        return next()
      } else {
        return next({
          status: 400,
          message: "Please Login first"
        });
      }
    });
  } catch (err) {
    return next({ status: 400, message: "Please login first." })
  }
}

exports.ensureCorrectUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded && decoded.id === req.params.id) {
        return next();
      } else {
        return next({
          status: 401,
          message: "UNAUTHORIZED *"

        })
      }
    })
  } catch (err) {
    return next({
      status: 401,
      message: "UNAUTHORIZED."
    })
  }
}