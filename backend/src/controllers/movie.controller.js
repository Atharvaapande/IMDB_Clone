const MovieService = require("../services/movie.service");

exports.getMovies = async (req, res) => {
  try {
    const movies = await MovieService.getAllMovies();
    res.json({ success: true, data: movies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const movie = await MovieService.createMovie(req.body);
    res.status(201).json({ success: true, data: movie });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
