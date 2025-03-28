const {
  sequelize,
  Producer,
  Movie,
  Actor,
  MovieActor,
} = require("../models/movie.model");

exports.getAllMovies = async () => {
  try {
    const result = await Movie.findAll({
      include: [
        {
          model: Producer,
          attributes: ["image", "name", "gender", "dob", "bio"], // Producer details
        },
        {
          model: Actor,
          attributes: ["image", "name", "gender", "dob", "bio"], // Actor details
          through: { attributes: [] }, // Exclude junction table data
        },
      ],
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

exports.getMoviesByID = async (movieID) => {
  try {
    console.log(movieID);
    const movie = await Movie.findByPk(movieID, {
      include: [
        { model: Actor, as: "actors", through: { attributes: [] } },
        { model: Producer, as: "producer" },
      ],
    });

    if (!movie) {
      throw new Error("Movie not found");
    }

    console.log("This is the movie by ID:", movie);
    return movie;
  } catch (error) {
    console.error("Error fetching movie by ID:", error.message);
    throw error; // Propagate the error to the caller
  }
};

exports.updateActor = async (actorID, actorData) => {
  try {
    await Actor.update(actorData, { where: { id: actorID } });
    const actor = await Actor.findByPk(actorID);
    if (!actor) {
      throw new Error("Actor not found");
    }
    return actor;
  } catch (error) {
    console.error("Error updating actor:", error.message);
    throw error;
  }
};

exports.createActor = async (actorData) => {
  try {
    const actor = await Actor.create(actorData);
    return actor;
  } catch (error) {
    console.error("Error creating actor by ID:", error.message);
    throw error;
  }
};

exports.updateProducer = async (producerID, producerData) => {
  try {
    await Producer.update(producerData, { where: { id: producerID } });
    let producer = Producer.findByPk(producerID);
    if (!producer) {
      throw new Error("prducer not found");
    }
    return producer;
  } catch (error) {
    console.error("Error fetching producer by ID:", error.message);
    throw error;
  }
};

exports.createProducer = async (producerData) => {
  try {
    const producer = await Producer.create(producerData);
    return producer;
  } catch (error) {
    console.error("Error creating producer by ID:", error.message);
    throw error;
  }
};

// exports.updateMovie = async(mo);
exports.findProducerWithTransication = async (producerID, transaction) => {
  try {
    let producer = Producer.findByPk(producerID, { transaction });
    if (!producer) {
      throw new Error("prducer not found");
    }
    return producer;
  } catch (error) {
    console.error("Error fetching producer by ID:", error.message);
    throw error;
  }
};

exports.createProducerWithTransaction = async (producerData, transaction) => {
  try {
    const producer = await Producer.create(producerData, { transaction });
    return producer;
  } catch (error) {
    console.error("Error creating producer by ID:", error.message);
    throw error;
  }
};

exports.createMovie = async (movieData, transaction) => {
  try {
    return await Movie.create(movieData, { transaction });
  } catch (error) {
    console.error("Error creating new movie", error.message);
    throw error;
  }
};

exports.findActorWithTransaction = async (actorID, transaction) => {
  try {
    const actor = await Actor.findByPk({
      where: { id: actorID },
      transaction,
    });
    return actor;
  } catch (error) {
    console.error("Error creating actor by ID:", error.message);
    throw error;
  }
};

exports.createActorWithTransication = async (actorData, transaction) => {
  try {
    const actor = await Actor.create(actorData, {
      transaction,
    });
    return actor;
  } catch (error) {
    console.error("Error creating actor by ID:", error.message);
    throw error;
  }
};

exports.createActorMovieAssociation = async (actorID, movieId, transaction) => {
  try {
    const association = await MovieActor.create(
      {
        movieId: movieId,
        actorId: actorID,
      },
      { transaction }
    );
    return association;
  } catch (error) {
    console.error("Error associating actor to movies", error.message);
    throw error;
  }
};
