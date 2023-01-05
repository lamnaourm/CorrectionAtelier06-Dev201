const express = require('express')
const actorModel = require('../models/ActorModel')
const routes = express.Router(); 


routes.get('/all', (req, res) => {
    actorModel.find({}, (err, actors) => {
        if(!err)
            res.json(actors);
        else 
            res.status(500).json({message: "error"});
    });
})


module.exports = routes