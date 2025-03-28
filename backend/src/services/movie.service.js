const {
  sequelize,
  Producer,
  Movie,
  Actor,
  MovieActor,
} = require("../models/movie.model");

exports.getAllMovies = async () => {
  const result = await Movie.findAll({
    include: [
      {
        model: Producer,
        attributes: ["name", "gender", "dob", "bio"], // Producer details
      },
      {
        model: Actor,
        attributes: ["name", "gender", "dob", "bio"], // Actor details
        through: { attributes: [] }, // Exclude junction table data
      },
    ],
  });
  console.log(result);
  return result;
};

exports.createMovie = async (movieData) => {
  return await Movie.create(movieData);
};
