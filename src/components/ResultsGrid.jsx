import React from "react";
import PropertyCard from "./PropertyCard";

export default function ResultsGrid({ properties }) {
  return (
    <div className="results">
      <h2>Available</h2>

      {properties.length === 0 ? (
        <p className="muted">No properties match your filters.</p>
      ) : (
        <div className="grid">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}
