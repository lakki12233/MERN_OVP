const router = require("express").Router();
const Movie = require("../models/Movie");
const verifys = require('../verifyToken');


//CREATE

router.post("/", verifys, async (req,res) => {
    if(req.user.isAdmin){
        const newMovie = new Movie(req.body);

        try{
           const savedMovie = await newMovie.save();
           res.status(201).json(savedMovie);
        }catch(err){
            res.status(500).json(err)
        }
    }  else{
            res.status(403).json("you are not allowed")
    }
});

//UPDATE 

router.put("/:id", verifys, async (req,res) => {
    if(req.user.isAdmin){
        try{
           const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            {
                 $set: req.body,
           }, 
           {new:true}
         );
           res.status(200).json(updatedMovie);
        }catch(err){
            res.status(500).json(err)
        }
    }  else{
            res.status(403).json("you are not allowed")
    }
});

// DELETE

router.delete("/:id", verifys, async (req,res) => {
    if(req.user.isAdmin){
        try{
           await Movie.findByIdAndDelete(req.params.id);
           res.status(200).json("the movie has been deleted");
        }catch(err){
            res.status(500).json(err)
        }
    }  else{
            res.status(403).json("you are not allowed")
    }
});

//GET

router.get("/find/:id", verifys, async (req,res) => {
        try{
           const movie = await Movie.findById(req.params.id);
           res.status(200).json(movie);
        }catch(err){
            res.status(500).json(err)
        } 
});

//GET RANDOM

router.get("/random", verifys, async (req,res) => {
    const type = req.query.type;
    let movie;
    try{
      if(type === 'series') {
      movie = await Movie.aggregate([
        { $match : {isSeries : true}},
        { $sample: {size: 1} },
      ]);
      } else {
        movie = await Movie.aggregate([
            { $match : {isSeries : false}},
            { $sample: {size: 1} },
          ]);
      }
      res.status(200).json(movie);
    }catch(err){
        res.status(500).json(err);
    } 
});


//GET ALL 

router.get("/", verifys, async (req,res) => {
    if(req.user.isAdmin){
        try{
          const movies =  await Movie.find();
           res.status(200).json(movies.reverse());
        }catch(err){
            res.status(500).json(err)
        }
    }  else{
            res.status(403).json("you are not allowed")
    }
});



// GET BY GENRE
router.get("/:genre", verifys, async (req, res) => {
    const genre = req.params.genre; 
    
    try {
      // Construct a query object to find movies with the specified genre
      const movies = await Movie.find({ genre: genre });
  
      res.status(200).json(movies);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router