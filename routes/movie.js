const express = require("express");
const movieModel = require("../models/MovieModel");
const actorModel = require("../models/ActorModel");
const directorModel = require("../models/ActorModel");
const routes = express.Router();

routes.get("/all", (req, res) => {
  movieModel.find({}, (err, movies) => {
    if (!err) res.json(movies);
    else res.status(500).json({ message: "error" });
  });
});

routes.get("/actors/:filmname", (req, res) => {
  movieModel.findOne({ name: req.params.filmname }, (err, movie) => {
    if (err) res.status(500).json({ message: err });
    else {
      if (movie == null) res.status(404).json({ message: "movie not found" });
      else
        actorModel.find({ name: { $in: movie.actors } }, (error, actors) => {
          if (!error) res.json(actors);
          else res.status(500).json({ message: error });
        });
    }
  });
});

routes.get("/director/:filmname", (req, res) => {
  movieModel.findOne({ name: req.params.filmname }, (err, movie) => {
    if (err) res.status(500).json({ message: err });
    else {
      if (movie == null) res.status(404).json({ message: "movie not found" });
      else
        directorModel.find({ name: movie.director }, (error, director) => {
          if (!error) res.json(director);
          else res.status(500).json({ message: error });
        });
    }
  });
});

routes.get("/listCategorie/:category", (req, res) => {
  movieModel.find({categories: req.params.category}, (err, actors) => {
    if (!err) res.json(actors);
    else res.status(500).json({ message: "error" });
  });
});

routes.get("/:year1/:year2", (req, res) => {
  movieModel.find({year: {$gte:req.params.year1, $lte:req.params.year2}}, (err, actors) => {
    if (!err) res.json(actors);
    else res.status(500).json({ message: "error" });
  });
});

routes.post("/add", (req, res) => {
  const movieModel = new movieModel(req.body);

  movieModel.save((err, movie) => {
    if (err) res.status(500).json({ message: err });
    else res.status(201).json(movie);
  });
});

routes.put("/update/:name", (req, res) => {
  const name = req.params.name;

  movieModel.findOne({ name: name }, (err, movie) => {
    if (!err && movie == null) res.sendStatus(404);
    else
      movieModel.updateOne({ name: name }, req.body, (err, resultat) => {
        if (!err) res.json(resultat);
        else res.status(500).json({ message: err });
      });
  });
});

routes.delete("/delete/:name", (req, res) => {
  const name = req.params.name;

  movieModel.findOne({ name: name }, (err, movie) => {
    if (!err && movie == null) res.sendStatus(404);
    else
      movieModel.deleteOne({ name: name }, req.body, (err, resultat) => {
        if (!err) res.json(resultat);
        else res.status(500).json({ message: err });
      });
  });
});

module.exports = routes;
