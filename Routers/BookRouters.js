const express = require("express");
const { BookModel } = require("../Models/Book_Model");
const BookRouter = express.Router();

//post book
BookRouter.post("/add", async (req, res) => {
  try {
    const newBook = new BookModel(req.body);
    await newBook.save();
    res.send("New Book has Been Added");
  } catch (error) {
    res.send(error);
  }
});

//get all book

BookRouter.get("/", async (req, res) => {
  const { q, page, limit } = req.query;

  let query = {};

  if (q) {
    query.title = { $regex: q, $options: "i" };
  }

  const toSkip = (page - 1) * limit;

  try {
    const Books = await BookModel.find(query).skip(toSkip).limit(limit);
    if (Books.length == 0) {
      res.send("No Books Available");
    } else {
      res.send(Books);
    }
  } catch (error) {
    res.send(error);
  }
});

//get a book by id

BookRouter.get("/:bookId", async (req, res) => {
  const { bookId } = req.params;

  try {
    const Books = await BookModel.find({ _id: bookId });
    if (Books.length == 0) {
      res.send("No Books Available");
    } else {
      res.send(Books);
    }
  } catch (error) {
    res.send(error);
  }
});

//patch/update the book

BookRouter.patch("/:bookId", async (req, res) => {
  const { bookId } = req.params;

  try {
    await BookModel.findByIdAndUpdate({ _id: bookId }, req.body);
    res.send("Book Updated");
  } catch (error) {
    res.send(error);
  }
});

//Delete the book

BookRouter.delete("/:bookId", async (req, res) => {
  const { bookId } = req.params;

  try {
    await BookModel.findByIdAndDelete({ _id: bookId });
    res.send("Book Deleted");
  } catch (error) {
    res.send(error);
  }
});

module.exports = {
  BookRouter,
};
