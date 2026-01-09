import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavourites } from "./FavouritesContext";
import RemoveDropZone from "./RemoveDropZone";

export default function FavouritesPanel() {
  const { favourites, addFavourite, removeFavourite, clearFavourites } = useFavourites();

  const [allProperties, setAllProperties] = useState([]);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("properties.json");
      const data = await res.json();
      setAllProperties(data.properties || []);
    };
    fetchData();
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault(); // REQUIRED to allow drop
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDropAdd = (e) => {
    e.preventDefault();
    setIsOver(false);

    const id = e.dataTransfer.getData("text/plain");
    const property = allProperties.find((p) => p.id === id);

    if (property) addFavourite(property);
  };

  return (
    <div
      className="favs"
      onDragOver={handleDragOver}
      onDrop={handleDropAdd}
      onDragEnter={() => setIsOver(true)}
      onDragLeave={() => setIsOver(false)}
      style={{ outline: isOver ? "3px solid rgba(11,87,208,0.25)" : "none" }}
    >
      <h2>Favourites</h2>

      {favourites.length === 0 ? (
        <p className="muted">No favourites yet. Drag a property card here.</p>
      ) : (
        <>
          <ul className="fav-list">
            {favourites.map((p) => (
              <li
                key={p.id}
                className="fav-item"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", p.id);
                  e.dataTransfer.effectAllowed = "move";
                }}
                style={{ cursor: "grab" }}>
                <div className="fav-meta">
                  <strong>{p.type}</strong>
                  <div className="muted">{p.postcodeArea}</div>
                  <Link className="link" to={`/property/${p.id}`}>
                    View →
                  </Link>
                </div>

                <button type="button" onClick={() => removeFavourite(p.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <RemoveDropZone />

          <button type="button" onClick={clearFavourites} style={{ marginTop: 10 }}>
            Clear list
          </button>
        </>
      )}
    </div>
  );
}
