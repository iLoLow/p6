const mongoose = require("mongoose");
const MongooseErrors = require("mongoose-errors");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

userSchema.plugin(uniqueValidator);
saucesSchema.plugin(MongooseErrors);

module.exports = mongoose.model("User", userSchema);
