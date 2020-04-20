const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;


mongoose.connect(process.env.mongoURI, (err) => {
  console.log(`err: ${err}`)
});

console.log("mongoose shit", mongoose.connection.readyState)

module.exports.User = require("./user")
module.exports.Message = require("./message")