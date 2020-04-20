const db = require("../models");

exports.createMessage = async function (req, res, next) {
  try {
    let message = await db.Message.create({
      text: req.body.text,
      user: req.params.id
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.messages.push(message.id);
    await foundUser.save();
    let foundMessage = await db.Message.findById(message._id).populate("user", {
      username: true,
      profileImageUrl: true
    });
    return res.status(200).json(foundMessage)
  } catch (err) {
    return next(err)
  }
}

exports.getMessage = async function (req, res, next) {
  try {
    let message = await db.message.find(req.params.message._id);
    return res.status(200).json(message)
  } catch (err) {
    return next(err)
  }
}

exports.deleteMessage = async function (req, res, next) {
  try {
    let message = db.message.findById(req.params.message._id)
    await message.remove();
    return res.status(200).json(message)
  } catch (err) {
    return next(err)
  }
}