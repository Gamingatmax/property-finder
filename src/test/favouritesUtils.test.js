import { addFavouriteUnique, removeFavouriteById, clearFavourites } from "../utils/favouritesUtils";

describe("favouritesUtils", () => {
  const a = { id: "prop1", type: "House" };
  const b = { id: "prop2", type: "Flat" };

  test("addFavouriteUnique adds new favourite", () => {
    const out = addFavouriteUnique([], a);
    expect(out).toHaveLength(1);
    expect(out[0].id).toBe("prop1");
  });

  test("addFavouriteUnique prevents duplicates", () => {
    const out = addFavouriteUnique([a], a);
    expect(out).toHaveLength(1);
  });

  test("removeFavouriteById removes the matching id", () => {
    const out = removeFavouriteById([a, b], "prop1");
    expect(out.map((p) => p.id)).toEqual(["prop2"]);
  });

  test("clearFavourites empties the list", () => {
    expect(clearFavourites()).toEqual([]);
  });
});
