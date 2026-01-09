import React, { useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function SearchForm({
  onApply,
  onReset,
  initialCriteria,
  postcodeOptions = [],
  priceBounds = { min: 0, max: 2000000 },
  bedBounds = { min: 0, max: 10 }
}) {
  // Build initial widget-friendly state (numbers, not strings)
  const initial = {
    type: initialCriteria?.type || "",
    postcodeArea: initialCriteria?.postcodeArea || "",
    priceRange: [
      Number.isFinite(Number(initialCriteria?.minPrice))
        ? Number(initialCriteria.minPrice)
        : priceBounds.min,
      Number.isFinite(Number(initialCriteria?.maxPrice))
        ? Number(initialCriteria.maxPrice)
        : priceBounds.max
    ],
    bedRange: [
      Number.isFinite(Number(initialCriteria?.minBedrooms))
        ? Number(initialCriteria.minBedrooms)
        : bedBounds.min,
      Number.isFinite(Number(initialCriteria?.maxBedrooms))
        ? Number(initialCriteria.maxBedrooms)
        : bedBounds.max
    ],
    addedFrom: initialCriteria?.addedFrom ? new Date(initialCriteria.addedFrom) : null,
    addedTo: initialCriteria?.addedTo ? new Date(initialCriteria.addedTo) : null

  };

  const [form, setForm] = useState(initial);

  // If bounds change after JSON loads, keep sliders valid
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      priceRange:
        Array.isArray(prev.priceRange) && prev.priceRange.length === 2
          ? prev.priceRange
          : [priceBounds.min, priceBounds.max],
      bedRange:
        Array.isArray(prev.bedRange) && prev.bedRange.length === 2
          ? prev.bedRange
          : [bedBounds.min, bedBounds.max]
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceBounds.min, priceBounds.max, bedBounds.min, bedBounds.max]);

  const typeOptions = [
    { value: "", label: "Any" },
    { value: "House", label: "House" },
    { value: "Flat", label: "Flat" }
  ];

  const selectedType = typeOptions.find((o) => o.value === form.type) || typeOptions[0];
  const selectedPostcode =
    postcodeOptions.find((o) => o.value === form.postcodeArea) || null;

  // Never let slider values be undefined
  const safePriceRange =
    Array.isArray(form.priceRange) && form.priceRange.length === 2
      ? form.priceRange
      : [priceBounds.min, priceBounds.max];

  const safeBedRange =
    Array.isArray(form.bedRange) && form.bedRange.length === 2
      ? form.bedRange
      : [bedBounds.min, bedBounds.max];

  const apply = (e) => {
    e.preventDefault();

    const [minPrice, maxPrice] = safePriceRange;
    const [minBedrooms, maxBedrooms] = safeBedRange;

    onApply?.({
      type: form.type,
      postcodeArea: form.postcodeArea,
      minPrice,
      maxPrice,
      minBedrooms,
      maxBedrooms,
      addedFrom: form.addedFrom ? form.addedFrom.toISOString().slice(0, 10) : "",
      addedTo: form.addedTo ? form.addedTo.toISOString().slice(0, 10) : ""
    });
  };

  const reset = () => {
    const cleared = {
      type: "",
      postcodeArea: "",
      minPrice: priceBounds.min,
      maxPrice: priceBounds.max,
      minBedrooms: bedBounds.min,
      maxBedrooms: bedBounds.max,
      addedFrom: null,
      addedTo: null
    };

    setForm({
      type: "",
      postcodeArea: "",
      priceRange: [priceBounds.min, priceBounds.max],
      bedRange: [bedBounds.min, bedBounds.max],
      addedAfter: null
    });

    onReset?.(cleared);
  };

  return (
    <form className="search-form" onSubmit={apply}>
      <h2>Search</h2>

      <div className="fields">
        <label>
          Property type
          <Select
            classNamePrefix="rs"
            options={typeOptions}
            value={selectedType}
            onChange={(opt) => setForm((p) => ({ ...p, type: opt?.value ?? "" }))}
          />
        </label>

        <label>
          Postcode area
          <Select
            classNamePrefix="rs"
            options={postcodeOptions}
            value={selectedPostcode}
            isClearable
            placeholder="Any"
            onChange={(opt) =>
              setForm((p) => ({ ...p, postcodeArea: opt?.value ?? "" }))
            }
          />
        </label>

        <div className="range-block">
          <div className="range-head">
            <span>Price range</span>
            <span className="muted">
              £{Number(safePriceRange[0]).toLocaleString()} – £
              {Number(safePriceRange[1]).toLocaleString()}
            </span>
          </div>

          <Slider
            range
            min={priceBounds.min}
            max={priceBounds.max}
            value={safePriceRange}
            onChange={(val) => setForm((p) => ({ ...p, priceRange: val }))}
            allowCross={false}
          />
        </div>

        <div className="range-block">
          <div className="range-head">
            <span>Bedrooms</span>
            <span className="muted">
              {safeBedRange[0]} – {safeBedRange[1]}
            </span>
          </div>

          <Slider
            range
            min={bedBounds.min}
            max={bedBounds.max}
            value={safeBedRange}
            onChange={(val) => setForm((p) => ({ ...p, bedRange: val }))}
            allowCross={false}
          />
        </div>

        <label>
          Added from
          <DatePicker
            selected={form.addedFrom}
            onChange={(date) => setForm((p) => ({ ...p, addedFrom: date }))}
            placeholderText="Any"
            dateFormat="yyyy-MM-dd"
            className="date-input"
            isClearable
          />
        </label>

        <label>
          Added to
          <DatePicker
            selected={form.addedTo}
            onChange={(date) => setForm((p) => ({ ...p, addedTo: date }))}
            placeholderText="Any"
            dateFormat="yyyy-MM-dd"
            className="date-input"
            isClearable
          />
        </label>
      </div>

      <div className="actions">
        <button type="submit">Apply filters</button>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>
    </form>
  );
}
