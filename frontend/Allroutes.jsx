import React from "react";
// import { Route, Routes } from 'react-router-dom'
import Homepage from "./src/pages/Homepage";
import SignIn from "./src/pages/SignIn ";
import SignUp from "./src/pages/SignUp";
import { Route, Routes } from "react-router-dom";
import MovieList from "./src/pages/MovieList";
import MovieForm from "./src/pages/MovieForm";
import MovieDetails from "./src/pages/MovieDetails";
import EditMovie from "./src/pages/Edit";
import Admin from "./src/pages/Admin";
import PrivateAdmin from "./src/pages/PrivateAdmin";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/sign-in" element={<SignIn />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route path="/MovieList" element={<MovieList />}></Route>
      <Route path="/MovieForm" element={<MovieForm />}></Route>
      <Route path="/MovieDetails" element={<MovieDetails />}></Route>
      <Route path="/edit/:userId/:movieId" element={<EditMovie />}></Route>
      <Route
        path="/admin"
        element={
          <PrivateAdmin>
            <Admin />
          </PrivateAdmin>
        }
      ></Route>
    </Routes>
  );
};

export default Allroutes;
