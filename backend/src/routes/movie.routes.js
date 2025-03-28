const express = require("express");
const { getMovies, createMovie } = require("../controllers/movie.controller");
const router = express.Router();

router.get("/getMovies", getMovies);
router.post("/createNewMovie", createMovie);

module.exports = router;
