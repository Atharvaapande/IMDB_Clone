const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Producer Model
const Producer = sequelize.define(
  "producers",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING },
    dob: { type: DataTypes.DATE },
    bio: { type: DataTypes.TEXT },
  },
  { timestamps: false }
);

// Movie Model
const Movie = sequelize.define(
  "movies",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    year_of_release: { type: DataTypes.INTEGER },
    plot: { type: DataTypes.TEXT },
    poster: { type: DataTypes.STRING },
    ratting: { type: DataTypes.INTEGER },
    producer_id: {
      type: DataTypes.INTEGER,
      references: { model: "producers", key: "id" },
    },
  },
  { timestamps: false }
);

// Actor Model
const Actor = sequelize.define(
  "actors",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING },
    dob: { type: DataTypes.DATE },
    bio: { type: DataTypes.TEXT },
  },
  { timestamps: false }
);

// MovieActors (Junction Table)
const MovieActor = sequelize.define("movie_actors", {}, { timestamps: false });

// Define Relationships
Producer.hasMany(Movie, { foreignKey: "producer_id" });
Movie.belongsTo(Producer, { foreignKey: "producer_id" });

Movie.belongsToMany(Actor, { through: MovieActor });
Actor.belongsToMany(Movie, { through: MovieActor });

module.exports = { sequelize, Producer, Movie, Actor, MovieActor };
