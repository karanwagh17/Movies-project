const { default: mongoose } = require("mongoose");
const movieModel = require("../models/movieModel");

const postMovie = async (req, res) => {
  const { title, genre, director, release_year, description } = req.body;

  if (!title || !description || !genre || !director || !release_year) {
    return res.status(400).json({ message: "Please fill all the blanks!" });
  }

  console.log(req.user._id);
  try {
    const movie = await movieModel.create({
      ...req.body,
      userId: req.user._id,
    });
    return res
      .status(201)
      .json({ message: " movie added successfully!", movie });
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};
const getMovies = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  if (req.user._id != userId) {
    return res.status(400).json({ message: "u can't access this notes" });
  }
  try {
    const allmovies = await movieModel.find({ userId });
    if (!(allmovies.length > 0)) {
      return res.status(400).json({ message: "data not found" });
    }
    return res
      .status(200)
      .json({ message: "data fetched successfully ", allmovies });
  } catch (error) {
    return res.status(400).json({ message: error.messsage });
  }
};

const deletMovies = async (req, res) => {
  const { userId, movieId } = req.params;

  if (req.user._id != userId) {
    return res.status(400).json({ message: "You can't access this movie" });
  }



  try {
    const result = await movieModel.findByIdAndDelete(movieId);
    if (!result) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteAllByUser = async (req, res) => {
  const { userId } = req.params;
  if (req.user._id != userId) {
    return res.status(400).json({ message: "u can't access this notes" });
  }
  try {
    const result = await movieModel.deleteMany({ userId });
    if (!(result.deletedCount > 0)) {
      return res.status(400).json({ message: "data not fond" });
    }

    return res.status(200).json({ message: "notes deleted succefully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const updateMoviesByUser = async (req, res) => {
  const { userId, movieId } = req.params;

  if (req.user._id != userId) {
    return res.status(400).json({ message: "u can't access this movie" });
  }
  try {
    const upadateData = await movieModel.findByIdAndUpdate(movieId, {
      $set: { ...req.body },
    });
    if (!upadateData) {
      return res.status(500).json({ message: "movie not found" });
    }
    return res.status(200).json({ message: "movie updated", upadateData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getallMoviesAdmin = async (req, res) => {
  try {
    const adminMovie = await movieModel.find({});
    return res
      .status(200)
      .json({ message: "data fetched success", adminMovie });
  } catch (error) {
    return res.status(400).json({message:error.message})
  }
};
const getOneMovie = async(req,res) =>{
  const { userId, movieId } = req.params;
  console.log("User ID:", userId);

  try {
    const movie = await movieModel.findOne({ _id: movieId });



    console.log("movie found:", movie);
    res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getOneMovie,
  postMovie,
  getMovies,
  deletMovies,
  getallMoviesAdmin,
  deleteAllByUser,
  updateMoviesByUser,
};
