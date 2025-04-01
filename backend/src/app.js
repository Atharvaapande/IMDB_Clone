const express = require("express");
const cors = require("cors");
const movieRoutes = require("./routes/movie.routes");
// const producerRoutes = require("./routes/producer.routes");
// const actorRoutes = require("./routes/actor.routes");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api/movies", movieRoutes);
// app.use("/api/actors", actorRoutes);
// app.use("/api/producers", producerRoutes);

module.exports = app;
