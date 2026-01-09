import React, { useState } from "react";
import { useFavourites } from "./FavouritesContext";

export default function RemoveDropZone() {
  const { removeFavourite } = useFavourites();
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();         // ✅ prevent parent from treating it as "drop to add"
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();         // ✅ THIS is the main fix
    setIsOver(false);

    const id = e.dataTransfer.getData("text/plain");
    if (id) removeFavourite(id);
  };


  return (
    <div
      className="remove-zone"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnter={() => setIsOver(true)}
      onDragLeave={() => setIsOver(false)}
      style={{
        opacity: isOver ? 1 : 0.85,
        outline: isOver ? "3px solid rgba(220,38,38,0.25)" : "none"
      }}
    >
      Drop here to remove
    </div>
  );
}
