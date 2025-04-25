const express = require("express");
const {
  postMovie,
  getMovies,
  deletMovies,
  deleteAllByUser,
  updateMoviesByUser,
  getallMoviesAdmin,
 getOneMovie
} = require("../controllers/movie.controller");
const Auth = require("../middleware/Auth");
const checkAdmin = require("../middleware/checkAdmin");

const moviesRouter = express.Router();

moviesRouter.post("/postMovie", Auth, postMovie);
moviesRouter.get("/getMovies/:userId", Auth, getMovies);
moviesRouter.delete("/deletMovies/:userId/:movieId", Auth, deletMovies);
moviesRouter.delete("/deleteAllByUser/:userId", Auth, deleteAllByUser);
moviesRouter.patch(
  "/updateMoviesByUser/:userId/:movieId",
  Auth,
  updateMoviesByUser
);
moviesRouter.get("/getOneMovie/:userId/:movieId", Auth, getOneMovie);

moviesRouter.get("/getallMoviesAdmin", Auth, checkAdmin, getallMoviesAdmin);


module.exports = moviesRouter;
