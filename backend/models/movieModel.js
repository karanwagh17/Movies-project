const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  genre: String,
  director: String,
  release_year: Number,
  description: String,
  userId: {
    type: String, 
    required: true,
  },
  image : {
    type: String, 
    required: true,
  }
});

const  movieModel = mongoose.model("movies",movieSchema) 

module.exports=movieModel