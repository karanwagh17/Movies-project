import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

const Admin = () => {
  const [movies, setMovies] = useState(null);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/movies/getallMoviesAdmin",
        {
          withCredentials: true,
        }
      );
      setMovies(res.data.adminMovie)
      console.log(res)
    } catch (error) {
      console.error("Error fetching admin movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", padding: "1rem" }}>
      {movies && movies.length > 0 ? (
        movies.map((movie) => (
          <Card key={movie._id} style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={movie.image}
            />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.description}</Card.Text>
              <Card.Text><strong>Genre:</strong> {movie.genre}</Card.Text>
              <Card.Text><strong>Director:</strong> {movie.director}</Card.Text>
              <Card.Text><strong>Year:</strong> {movie.release_year}</Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
};

export default Admin;
