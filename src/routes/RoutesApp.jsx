import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/MoodTrackerComponent/Home";
import DashBoard from "../components/MoodTrackerComponent/DashBoard";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
const RoutesApp = () => {
  return (
    <>
      <BrowserRouter basename="/MoodTracker">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/dashBoard" element={<DashBoard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RoutesApp;
