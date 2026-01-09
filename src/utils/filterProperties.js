// src/utils/filterProperties.js


function addedToDate(added) {
  // added: { month: "October", day: 12, year: 2022 }
  if (!added) return null;
  const m = monthToNumber(added.month);
  if (m === null) return null;
  return new Date(added.year, m, added.day);
}

const monthToNumber = (monthName) => {
  // Month name -> 1..12 (works with "January", "February", ...)
  const d = new Date(`${monthName} 1, 2000`);
  const m = d.getMonth();
  return Number.isFinite(m) ? m + 1 : null;
};

const toISODate = (added) => {
  if (!added?.month || added?.day == null || added?.year == null) return "";
  const mm = monthToNumber(added.month);
  if (!mm) return "";
  const month = String(mm).padStart(2, "0");
  const day = String(added.day).padStart(2, "0");
  return `${added.year}-${month}-${day}`; // "YYYY-MM-DD"
};

export function filterProperties(properties, criteria) {
  const {
    type,
    postcodeArea,
    minPrice,
    maxPrice,
    minBedrooms,
    maxBedrooms,
    addedAfter
  } = criteria;


  const trimmedPostcode = (postcodeArea || "").trim().toUpperCase();

  return properties.filter((p) => {

    const propISO = toISODate(p.added);

    // From date (inclusive)
    if (criteria.addedFrom) {
      if (!propISO || propISO < criteria.addedFrom) return false;
    }

    // To date (inclusive)
    if (criteria.addedTo) {
      if (!propISO || propISO > criteria.addedTo) return false;
  }


    // Type
    if (type && p.type !== type) return false;

    // Postcode area (exact match against our stored field)
    if (trimmedPostcode) {
      const pArea = String(p.postcodeArea || "").toUpperCase();
      if (pArea !== trimmedPostcode) return false;
    }

    // Price range
    const price = Number(p.price);
    if (minPrice !== "" && minPrice != null && price < Number(minPrice)) return false;
    if (maxPrice !== "" && maxPrice != null && price > Number(maxPrice)) return false;

    // Bedroom range
    const beds = Number(p.bedrooms);
    if (minBedrooms !== "" && minBedrooms != null && beds < Number(minBedrooms)) return false;
    if (maxBedrooms !== "" && maxBedrooms != null && beds > Number(maxBedrooms)) return false;

    // Added after
    if (addedAfter) {
      const addedDate = addedToDate(p.added);
      const afterDate = new Date(addedAfter);
      // If property has bad/missing added date, exclude it when filter is active
      if (!addedDate) return false;
      if (addedDate < afterDate) return false;
    }

    return true;
  });
}
