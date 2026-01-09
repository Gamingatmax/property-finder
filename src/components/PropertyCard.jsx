import React from "react";
import { Link } from "react-router-dom";
import { useFavourites } from "./FavouritesContext";


export default function PropertyCard({ property }) {
  const { type, bedrooms, price, location, added, images, picture } = property;
  const { addFavourite } = useFavourites();

  const handleDragStart = (e) => {
  // Store the property ID so drop zones can read it
  e.dataTransfer.setData("text/plain", property.id);
  e.dataTransfer.effectAllowed = "copy";
  };

  const firstImage =
    (Array.isArray(images) && images.length > 0 && images[0]) || picture;

  return (
    <article 
      className="card"
      draggable
      onDragStart={handleDragStart}
      style={{ cursor: "grab" }}>
        
      <div className="card-image">
        {firstImage ? (
          <img src={firstImage} alt={`${type} in ${location}`} />
        ) : (
          <div className="img-placeholder">No image</div>
        )}
      </div>

      <div className="card-body">
        <h3>{type}</h3>
        <p className="muted">{location}</p>

        <p className="price">£{Number(price).toLocaleString()}</p>
        <p>{bedrooms} bedrooms</p>

        {added && (
          <p className="muted">
            Added: {added.month} {added.day}, {added.year}
          </p>
        )}

        <button type="button" onClick={() => addFavourite(property)}>
          Add to favourites
        </button>
        <Link to={`/property/${property.id}`} className="link">
          View details →
        </Link>
      </div>
    </article>
  );
}
