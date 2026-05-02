const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

router.post("/", async (req, res) => {
  const { title, director, rating } = req.body;

  if (!title || !director || !rating) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (rating < 1 || rating > 10) {
    return res.status(400).json({ message: "Rating must be between 1 to 10" });
  }

  const movie = await Movie.create({ title, director, rating });
  res.status(201).json(movie);


});
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Movie.findByIdAndDelete(id);
  res.json({ message: "Movie deleted" });
});

module.exports = router;
