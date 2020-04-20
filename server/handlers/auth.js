const db = require("../models");
const jwt = require("jsonwebtoken")

exports.signin = async function (req, res, next) {
  try {


    let user = await db.User.findOne({
      email: req.body.email
    });
    let { id, username, profileImageUrl } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign({
        id,
        username,
        profileImageUrl
      }, process.env.SECRET_KEY
      )
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      })
    } else {
      return next({
        status: 400,
        message: 'Invalid Email / PATHword'
      })
    }
  } catch (err) {
    return next({
      status: 400,
      message: "Invalid Sign in Credentials"
    })
  }
}



exports.signup = async function (req, res, next) {
  console.log("signingup", req.body)
  try {
    let user = await db.User.create(req.body);
    let { id, username, profileImageUrl } = user;
    let token = jwt.sign({
      id,
      username,
      profileImageUrl
    }, process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    })

  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry that email and/ or password combination is WRONG."
    }
    return next({
      status: 400,
      message: err.message
    })
  }
};