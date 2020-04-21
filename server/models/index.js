const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;


mongoose.connect(process.env.mongoURI, (err) => {
  console.log(`err: ${err}`)
});


module.exports.User = require("./user")
module.exports.Message = require("./message")