import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Therapists from "./components/pages/Therapists";

function App() {
  return (
    <div className="flex min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Therapists />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
