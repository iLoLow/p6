const mongoose = require("mongoose");
const MongooseErrors = require("mongoose-errors");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    //regex mail
    match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, "incorrect email format"],
  },
  password: {
    type: String,
    require: true,
    match: [
      /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,30})/g,
      "Ensure that password is 8 to 30 characters long and contains a mix of upper and lower case characters, one numeric and one special character",
    ],
  },
});
//unique validator for email
userSchema.plugin(uniqueValidator);
//mongoose errors
userSchema.plugin(MongooseErrors);

module.exports = mongoose.model("User", userSchema);
