const sequelize = require("../config/db");
const MovieService = require("../services/movie.service");

exports.getMovies = async (req, res) => {
  try {
    const movies = await MovieService.getAllMovies();
    res.status(201).json({ success: true, data: movies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMoviesID = async (req, res) => {
  try {
    const { movieID } = req.params;
    const movie = await MovieService.getMoviesByID(movieID);
    res.status(201).json({ success: true, data: movie });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateMovie = async (req, res) => {
  const movieId = req.params.id;
  const {
    name,
    year_of_release,
    poster,
    poster_landscape,
    rating,
    plot,
    actors,
    producer,
  } = req.body;

  try {
    // Find the movie by ID
    const movie = await MovieService.getMoviesByID(movieId);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Update movie details
    console.log("{}{}{{}{}{}{{}", rating);
    movie.name = name;
    movie.year_of_release = year_of_release;
    movie.poster = poster;
    movie.poster_landscape = poster_landscape;
    movie.ratting = rating;
    movie.plot = plot;

    // Save the updated movie details
    await movie.save();

    // Update actors
    if (actors && Array.isArray(actors)) {
      // Clear existing actors
      await movie.setActors([]);
      // Add new actors
      for (const actorData of actors) {
        try {
          let actor;
          if (actorData.id) {
            actor = await MovieService.updateActor(actorData.id, actorData);
          } else {
            actor = await MovieService.createActor(actorData);
          }
          if (actor) {
            await movie.addActor(actor);
          }
        } catch (error) {
          console.error("Error processing actor:", error);
          // Continue with other actors even if one fails
          continue;
        }
      }
    }

    // Update producer
    if (producer) {
      // let prod = await Producer.findOne({ where: { id: producer.id } });
      let prod = await MovieService.updateProducer(producer.id, producer);
      if (!prod) {
        // prod = await Producer.create(producer);
        prod = await MovieService.createProducer(producer);
      }
      await movie.setProducer(prod);
    }

    res.status(201).json({ success: true, movie });
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createMovie = async (req, res) => {
  const {
    name,
    year_of_release,
    poster,
    poster_landscape,
    plot,
    actors,
    producer,
  } = req.body;

  try {
    // Start a transaction
    const transaction = await sequelize.transaction();

    try {
      // Create or find the producer
      let prod;
      if (producer.id) {
        prod = await MovieService.findProducerWithTransication(
          producer.id,
          transaction
        );
      } else {
        prod = await MovieService.createProducerWithTransaction(
          producer,
          transaction
        );
      }

      // Create the movie with the producer ID
      const movie = await MovieService.createMovie(
        {
          name,
          year_of_release,
          poster,
          poster_landscape,
          plot,
          producer_id: prod.id,
        },
        transaction
      );

      // Handle actors
      if (actors && Array.isArray(actors)) {
        for (const actorData of actors) {
          let actor;
          if (actorData.id) {
            actor = await MovieService.findActorWithTransaction(
              actorData.id,
              transaction
            );
          } else {
            actor = await MovieService.createActorWithTransication(
              actorData,
              transaction
            );
          }
          await MovieService.createActorMovieAssociation(
            actor.id,
            movie.id,
            transaction
          );
        }
      }

      // Commit the transaction
      await transaction.commit();

      res.status(201).json({ success: true, movie });
    } catch (error) {
      // Rollback the transaction in case of error
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
