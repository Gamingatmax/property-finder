import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PropertyGallery from "./PropertyGallery";
import PropertyTabs from "./PropertyTabs";
import { useFavourites } from "./FavouritesContext";


export default function PropertyPage() {
  const { id } = useParams();
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${import.meta.env.BASE_URL}properties.json`);
      const data = await res.json();
      setProperties(Array.isArray(data?.properties) ? data.properties : []);
      setLoading(false);
    })();
  }, []);

  if (loading) return <p>Loading…</p>;

  const property = properties.find((p) => p.id === id);   // ✅ correct match

  if (!property) return <p>The property ID in the URL didn’t match any listing.</p>;

  const { addFavourite } = useFavourites();


  if (loading) {
    return (
      <div className="page">
        <div className="hero">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="page">
        <div className="hero">
          <h1>Property not found</h1>
          <p className="muted">The property ID in the URL didn’t match any listing.</p>
          <Link to="/" className="link">← Back to search</Link>
        </div>
      </div>
    );
  }

  const mainImage =
    (Array.isArray(property.images) && property.images.length > 0 && property.images[0]) ||
    property.picture;

  return (
    <div className="page">
      <div className="container">
      <header className="hero">
        <Link to="/" className="link">← Back to search</Link>
        <h1>{property.type} • {property.postcodeArea}</h1>
        <p className="muted">{property.location}</p>
        <p className="price">£{Number(property.price).toLocaleString()}</p>
      </header>

      <main className="layout">
        <section className="main">
          <div className="details-card">
            <div className="details-image">
              {mainImage ? (
                <img src={mainImage} alt={`${property.type} in ${property.location}`} />
              ) : (
                <div className="img-placeholder">No image</div>
              )}
            </div>

            <div className="details-body">
              <h2>Key details</h2>
              <ul className="details-list">
                <li><strong>Bedrooms:</strong> {property.bedrooms}</li>
                <li><strong>Type:</strong> {property.type}</li>
                {property.tenure && <li><strong>Tenure:</strong> {property.tenure}</li>}
                {property.added && (
                  <li>
                    <strong>Added:</strong> {property.added.month} {property.added.day}, {property.added.year}
                  </li>
                )}
              </ul>

              <h2>Description</h2>
              <p>{property.descriptionLong}</p>

              {/* Later: favourite button + add/remove */}
              <button type="button" onClick={() => addFavourite(property)}>
                Add to favourites
              </button>
            </div>
          </div>

          <div className="details-card" style={{ marginTop: 18 }}>
            <h2>Images</h2>
            <PropertyGallery property={property} />
          </div>

          <div className="details-card" style={{ marginTop: 18 }}>
            <h2>Details</h2>
            <PropertyTabs property={property} />
          </div>
        </section>

        <aside className="sidebar">
          <div className="favs">
            <h2>Favourites</h2>
            <p className="muted">We’ll connect this later.</p>
          </div>
        </aside>
      </main>
      </div>
    </div>
  );
}
