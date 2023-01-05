const express = require("express");
const directorModel = require("../models/DirectorModel");
const movieModel = require("../models/MovieModel");
const routes = express.Router();

routes.get("/all", (req, res) => {
  directorModel.find({}, (err, directors) => {
    if (!err) res.json(directors);
    else res.status(500).json({ message: "error" });
  });
});

routes.get("/names", (req, res) => {
  directorModel.distinct("name", (err, directors) => {
    if (!err) res.json(directors);
    else res.status(500).json({ message: "error" });
  });
});

routes.get("/movies", (req, res) => {
  const step1 = { $group: { _id: "$director", nb: { $sum: 1 } } };
  const step2 = { $project: { _id: 0, ActorName: "$_id", NBMOVIES: "$nb" } };

  movieModel.aggregate([step1, step2], (err, directors) => {
    if (!err) res.json(directors);
    else res.status(500).json({ message: "error" });
  });
});

routes.post("/add", (req, res) => {
  const director = new directorModel(req.body);

  director.save((err, director) => {
    if (err) res.status(500).json({ message: err });
    else res.status(201).json(director);
  });
});

routes.put("/update/:name", (req, res) => {
  const name = req.params.name;

  directorModel.findOne({ name: name }, (err, director) => {
    if (!err && director == null) res.sendStatus(404);
    else
      directorModel.updateOne({ name: name }, req.body, (err, resultat) => {
        if (!err) res.json(resultat);
        else res.status(500).json({ message: err });
      });
  });
});

routes.delete("/delete/:name", (req, res) => {
  const name = req.params.name;

  directorModel.findOne({ name: name }, (err, director) => {
    if (!err && director == null) res.sendStatus(404);
    else
      directorModel.deleteOne({ name: name }, req.body, (err, resultat) => {
        if (!err) res.json(resultat);
        else res.status(500).json({ message: err });
      });
  });
});

module.exports = routes;
