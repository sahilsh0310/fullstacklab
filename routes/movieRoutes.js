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



module.exports = router;
