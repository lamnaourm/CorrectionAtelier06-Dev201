const express = require("express");
const actorModel = require("../models/ActorModel");
const movieModel = require("../models/MovieModel");
const routes = express.Router();

routes.get("/all", (req, res) => {
  actorModel.find({}, (err, actors) => {
    if (!err) res.json(actors);
    else res.status(500).json({ message: "error" });
  });
});

routes.get("/names", (req, res) => {
  actorModel.distinct("name", (err, actors) => {
    if (!err) res.json(actors);
    else res.status(500).json({ message: "error" });
  });
});

routes.get("/movies", (req, res) => {
  const step1 = { $unwind: "$actors" };
  const step2 = { $group: { _id: "$actors", nb: { $sum: 1 } } };
  const step3 = { $project: { _id: 0, ActorName: "$_id", NBMOVIES: "$nb" } };

  movieModel.aggregate([step1, step2, step3], (err, actors) => {
    if (!err) res.json(actors);
    else res.status(500).json({ message: "error" });
  });
});

routes.post('/add', (req, res) => {

    const actor = new actorModel(req.body); 

    actor.save((err, actor) => {
        if(err)
            res.status(500).json({message: err})
        else 
            res.status(201).json(actor)
    })
})

routes.put('/update/:name', (req, res) => {

    const name = req.params.name; 

    actorModel.findOne({name:name}, (err, actor) => {

        if(!err && actor==null)
            res.sendStatus(404);
        else 
            actorModel.updateOne({name:name}, req.body, (err, resultat) => {
                if(!err)    
                    res.json(resultat)
                else 
                    res.status(500).json({message : err});
            })
    })
})

routes.delete('/delete/:name', (req, res) => {

    const name = req.params.name; 

    actorModel.findOne({name:name}, (err, actor) => {

        if(!err && actor==null)
            res.sendStatus(404);
        else 
            actorModel.deleteOne({name:name}, req.body, (err, resultat) => {
                if(!err)    
                    res.json(resultat)
                else 
                    res.status(500).json({message : err});
            })
    })
})

module.exports = routes;
