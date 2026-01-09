import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="page">
      <div className="hero">
        <h1>Page not found</h1>
        <p className="muted">That route doesn’t exist.</p>
        <Link to="/" className="link">← Back to search</Link>
      </div>
    </div>
  );
}
