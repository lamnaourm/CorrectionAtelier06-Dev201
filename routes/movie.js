const express = require("express");
const movieModel = require("../models/MovieModel");
const routes = express.Router();

routes.get("/all", (req, res) => {
  movieModel.find({}, (err, actors) => {
    if (!err) res.json(actors);
    else res.status(500).json({ message: "error" });
  });
});


routes.get('/actors/:filmname', (req, res) => {

});

routes.get('/director/:filmname', (req, res) => {

});

routes.get('/listCategorie/:category', (req, res) => {

});

routes.get('/:year1/:year2', (req, res) => {

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
