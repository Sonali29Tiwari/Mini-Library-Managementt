const express = require("express");
const router = express.Router();
const Book = require("../models/Book");


//Add new book
router.post("/", async (req, res) => {
  try {
    const { title, author, price, publishedDate } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: "Title & Author required" });
    }

    const book = new Book({
      title,
      author,
      price: price && !isNaN(price) ? Number(price) : undefined,
      publishedDate: publishedDate || undefined
    });

    const saved = await book.save();

    res.status(201).json(saved);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});



// GET All books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET Specific book
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

const handleSubmit = async (e) => {
  e.preventDefault();

  if (editId) {
    await axios.put(`${API}/${editId}`, form);
  } else {
    await axios.post(API, form);
  }

  fetchBooks();
};

module.exports = router;
