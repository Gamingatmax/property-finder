import React, { createContext, useContext, useMemo, useState } from "react";
import {
  addFavouriteUnique,
  removeFavouriteById,
  clearFavourites as clearFavs
} from "../utils/favouritesUtils";

const FavouritesContext = createContext(null);

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState([]);

  const addFavourite = (property) => {
    setFavourites((prev) => addFavouriteUnique(prev, property));
  };

  const removeFavourite = (id) => {
    setFavourites((prev) => removeFavouriteById(prev, id));
  };

  const clearFavourites = () => {
    setFavourites(clearFavs());
  };

  // ✅ THIS is the "value" your Provider needs
  const value = useMemo(
    () => ({ favourites, addFavourite, removeFavourite, clearFavourites }),
    [favourites]
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error("useFavourites must be used inside <FavouritesProvider>");
  return ctx;
}
