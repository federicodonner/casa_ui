import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";

class Router extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Login />} />
      </Routes>
    );
  }
}

export default Router;
