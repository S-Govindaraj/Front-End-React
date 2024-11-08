import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyForm from "./components/addPage/addpage";
import Todolist from "./components/mainPage/todolist";

function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Todolist />} />
        <Route path="/" element={<Todolist />} />
        <Route path="/create" element={<MyForm />} />
      </Routes>
    </Router>
  );
}

export default Routers;
