const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  ISBN: { type: String, required: true },
  description: { type: String, required: true },
  published_date: { type: String, required: true },
},{
    versionKey: false
});

const BookModel = mongoose.model("book", BookSchema);

module.exports = {
  BookModel,
};
