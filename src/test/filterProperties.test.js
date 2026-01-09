import { filterProperties } from "../utils/filterProperties";

const sample = [
  {
    id: "p1",
    type: "House",
    bedrooms: 3,
    price: 750000,
    postcodeArea: "BR5",
    added: { month: "October", day: 12, year: 2022 }
  },
  {
    id: "p2",
    type: "Flat",
    bedrooms: 2,
    price: 399995,
    postcodeArea: "BR6",
    added: { month: "September", day: 14, year: 2022 }
  },
  {
    id: "p3",
    type: "Flat",
    bedrooms: 1,
    price: 275000,
    postcodeArea: "NW1",
    added: { month: "January", day: 8, year: 2023 }
  }
];

describe("filterProperties", () => {
  test("filters by type and postcodeArea together", () => {
    const out = filterProperties(sample, {
      type: "Flat",
      postcodeArea: "BR6"
    });
    expect(out.map((p) => p.id)).toEqual(["p2"]);
  });

  test("filters by price range + bedrooms range together", () => {
    const out = filterProperties(sample, {
      minPrice: 250000,
      maxPrice: 450000,
      minBedrooms: 1,
      maxBedrooms: 2
    });
    expect(out.map((p) => p.id)).toEqual(["p2", "p3"]);
  });

  test("filters by addedAfter date", () => {
    const out = filterProperties(sample, {
      addedFrom: "2022-12-31"
    });
    expect(out.map((p) => p.id)).toEqual(["p3"]);
  });
});
