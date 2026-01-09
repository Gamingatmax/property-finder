export function addFavouriteUnique(list, property) {
  if (!property?.id) return list;
  if (list.some((p) => p.id === property.id)) return list;
  return [...list, property];
}

export function removeFavouriteById(list, id) {
  return list.filter((p) => p.id !== id);
}

export function clearFavourites() {
  return [];
}
