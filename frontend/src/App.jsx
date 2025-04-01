import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile/Profile";
import CreateButton from "./components/Create/CreateButton";
import CreateDog from "./components/Create/CreateDog";

import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile/:name" element={<Profile />} />
          <Route path="/create" element={<CreateDog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
