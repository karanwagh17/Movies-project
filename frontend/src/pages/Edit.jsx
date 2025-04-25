import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/Editmovie.css"
const EditMovie = () => {
  const { movieId, userId } = useParams();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const navigate = useNavigate();

  const fetchMovie = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BASEURL
        }/api/movies/getOneMovie/${userId}/${movieId}`,
        { withCredentials: true }
      );
      console.log(res);
      const movie = res.data;
      setImage(movie.image);

      setTitle(movie.title);
      setDescription(movie.description);
      setGenre(movie.genre);
      setDirector(movie.director);
      setReleaseYear(movie.release_year);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  const updateMovie = async () => {
    try {
      const res = await axios.patch(
        `${
          import.meta.env.VITE_BASEURL
        }/api/movies/updateMoviesByUser/${userId}/${movieId}`,
        {
          title: title,
          genre,
          director,
          release_year: releaseYear,
          description: description,
          image,
        },
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message);
      navigate("/MovieList");
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  return ( 
    <div className="edit-movie-container" style={{ padding: "1rem" }}>
      <h2>Edit Movie</h2>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
      />
      <br />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Director"
        value={director}
        onChange={(e) => setDirector(e.target.value)}
      />
      <br />
      <input
        type="number"
        placeholder="Release Year"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
      />
      <br />
      <button onClick={updateMovie}>Update Movie</button>
    </div>
  );
};

export default EditMovie;
