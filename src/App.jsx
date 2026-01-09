import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import PropertyPage from "./components/PropertyPage";
import NotFoundPage from "./components/NotFoundPage";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/property/:id" element={<PropertyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
