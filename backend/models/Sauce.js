const MongooseErrors = require("mongoose-errors");
const mongoose = require("mongoose");

const saucesSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  manufacturer: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  mainPepper: { type: String, required: true, trim: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String], default: [] },
  usersDisliked: { type: [String], default: [] },
});

saucesSchema.plugin(MongooseErrors);

module.exports = mongoose.model("Sauce", saucesSchema);
