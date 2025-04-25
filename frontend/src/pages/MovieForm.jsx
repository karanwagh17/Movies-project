import React, { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';

const MovieForm = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [genre, setgenre] = useState("");
  const [director, setdirector] = useState("");
  const [release_year, setrelease_year] = useState("");
  const [description, setdescription] = useState("");

  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const { _id } = userData || {};
  if(!_id){
    toast.error("login first")
  }
  const hendleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/movies/postMovie`,
        { title: title,genre,director,release_year, description: description , image},
        {
          withCredentials: true,
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form action="" onSubmit={hendleSubmit}>
      <label htmlFor="">image : </label>
        <input
          type="text"
          placeholder="enter title"
          onChange={(e) => setImage(e.target.value)}
        />{" "}
        <label htmlFor="">title : </label>
        <input
          type="text"
          placeholder="enter title"
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        <br /> <br />
        <label htmlFor="" placeholder="enter placeholder">
          genre :{" "}
        </label>
        <input type="text" onChange={(e) => setgenre(e.target.value)} /> <br />{" "}
        <br />

        <label htmlFor="" placeholder="enter placeholder">
        director :{" "}
        </label>
        <input type="text" onChange={(e) => setdirector(e.target.value)} /> <br />{" "}
        <br />
        <label htmlFor="" placeholder="enter placeholder">
        release_year :{" "}
        </label>
        <input type="text" onChange={(e) => setrelease_year(e.target.value)} /> <br />{" "}
        <br />
        <label htmlFor="" placeholder="enter placeholder">
          description :{" "}
        </label>
        <textarea
          onChange={(e) => setdescription(e.target.value)}
          placeholder="Content"
          rows={10}
          style={{ width: "100%", marginTop: "10px" }}
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default MovieForm
