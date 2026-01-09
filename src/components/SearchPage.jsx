import React, { useEffect, useMemo, useState } from "react";
import SearchForm from "../components/SearchForm";
import ResultsGrid from "../components/ResultsGrid";
import FavouritesPanel from "../components/FavouritesPanel";
import { filterProperties } from "../utils/filterProperties";

export default function SearchPage() {
  const [allProperties, setAllProperties] = useState([]);
  const [criteria, setCriteria] = useState({
    type: "",
    postcodeArea: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    addedAfter: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("properties.json");
      const data = await response.json();
      setAllProperties(data.properties || []);
    };
    fetchData();
  }, []);

  const filtered = useMemo(
    () => filterProperties(allProperties, criteria),
    [allProperties, criteria]
  );

  const postcodeOptions = useMemo(() => {
  const unique = Array.from(
    new Set(allProperties.map((p) => p.postcodeArea).filter(Boolean))
  ).sort();
  return unique.map((v) => ({ value: v, label: v }));
}, [allProperties]);

  const priceBounds = useMemo(() => {
    const prices = allProperties.map((p) => Number(p.price)).filter(Number.isFinite);
    if (prices.length === 0) return { min: 0, max: 2000000 };
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [allProperties]);

  const bedBounds = useMemo(() => {
    const beds = allProperties.map((p) => Number(p.bedrooms)).filter(Number.isFinite);
    if (beds.length === 0) return { min: 0, max: 10 };
    return { min: Math.min(...beds), max: Math.max(...beds) };
  }, [allProperties]);


  return (
    <div className="page">
      <div className="container">
      <header className="hero">
        <h1>Property Finder</h1>
        <p>Search properties by type, price, bedrooms, date added and postcode area.</p>
      </header>

      <main className="layout">
        <section className="main">
          <SearchForm
            initialCriteria={criteria}
            postcodeOptions={postcodeOptions}
            priceBounds={priceBounds}
            bedBounds={bedBounds}
            onApply={(next) => setCriteria(next)}
            onReset={(cleared) => setCriteria(cleared)}
          />

          <ResultsGrid properties={filtered} />
        </section>

        <aside className="sidebar">
          <FavouritesPanel />
        </aside>
      </main>
      </div>
    </div>
  );
}
