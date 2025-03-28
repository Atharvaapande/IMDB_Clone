const express = require("express");
const {
  getMovies,
  getMoviesID,
  updateMovie,
  createMovie,
} = require("../controllers/movie.controller");
const router = express.Router();

router.get("/getMovies", getMovies);
router.get("/getMovieByID/:movieID", getMoviesID);
router.put("/updateMovie/:id", updateMovie);
router.post("/createNewMovie", createMovie);

module.exports = router;
