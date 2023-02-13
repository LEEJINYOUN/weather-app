import "./App.css";
import React, { useEffect, useState } from "react";
import { authService } from "./fbase";
import { Routes, Route } from "react-router-dom";
import Auth from "../src/routes/Auth";
import Home from "../src/routes/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Auth />} />
      </Routes>
    </div>
  );
}

export default App;
