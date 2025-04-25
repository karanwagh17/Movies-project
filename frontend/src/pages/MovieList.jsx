import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const MovieList = () => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const _id = userData?._id;
  console.log(_id);
  const [Movies, setMovies] = useState("");

  if (!_id) {
    toast.error("login first");
  }
  const getMoviesData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/movies/getMovies/${_id}`,
        {
          withCredentials: true,
        }
      );
      setMovies(response.data.allmovies);

      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handelDelete = async (movieId) => {
    try {
      // alert (notesId)
      const response = await axios.delete(
        `http://localhost:8080/api/movies/deletMovies/${_id}/${movieId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response)
      toast.success(response.data.message || "Note deleted successfully");

      setMovies((prevMovie) => prevMovie.filter((movie) => movie._id !== movieId));
    } catch (error) {
      console.error(error);
      // toast.error(error.response?.data?.message || "Failed to delete note");
    }
  };
  useEffect(() => {
    getMoviesData();
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
      {Movies && Movies.length > 0 ? (
        Movies.map((el) => (
          <Card style={{ width: "18rem" }} key={el._id}>
            <Card.Body>
            <Card.Img variant="top" src={el.image} alt={el.title} />
              <Card.Title>{el.title}</Card.Title>
         
              <Card.Text>genre : {el.genre}</Card.Text>
              <Card.Text>director :{el.director}</Card.Text>
              <Card.Text>release_year : {el.release_year}</Card.Text>
              <Card.Text>description :{el.description.substring(0, 100)+"       ...read more"}</Card.Text>

              <Link to={`/edit/${_id}/${el._id}`}>
                <Button variant="primary">edit</Button>
              </Link>
              <Button variant="primary" onClick={() => handelDelete(el._id)}>
                delete
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p> notes not found</p>
      )}
    </div>
  );
};

export default MovieList;
