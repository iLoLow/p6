const MongooseErrors = require("mongoose-errors");
const mongoose = require("mongoose");
//shema form
const saucesSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "name length 3 characters min"],
    maxLength: [30, "name length 3 characters min"],
    //regex for accept letter and "'"
    match: [/^[a-zA-Z\s\']+$/g, "letter only and symbole : ' "],
  },
  manufacturer: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "manufacturer length 3 characters min"],
    maxLength: [30, "manufacturer length 30 characters max"],
    //regex for accept letter and "'"
    match: [/^[a-zA-Z\s\']+$/g, "letter only and symbole : ' "],
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "description length 3 characters min"],
    maxLength: [50, "description length 50 characters max"],
    //regex for accept letter, number and "'"
    match: [/^[a-zA-Z0-9\s\']+$/g, "letter only and symbole : ' "],
  },
  mainPepper: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "Main Pepper Ingredient length 3 characters min"],
    maxLength: [30, "Main Pepper Ingredient length 30 characters max"],
    //regex for accept letter and "'"
    match: [/^[a-zA-Z\s\']+$/g, "letter only and symbole : ' "],
  },
  imageUrl: { type: String },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String], default: [] },
  usersDisliked: { type: [String], default: [] },
});

saucesSchema.plugin(MongooseErrors);

module.exports = mongoose.model("Sauce", saucesSchema);
