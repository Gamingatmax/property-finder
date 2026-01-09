import React, { useMemo } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function buildGalleryItems(property) {
  // Try property.images first; fall back to property.picture
  const imgs = Array.isArray(property?.images) ? property.images : [];
  const fallback = property?.picture ? [property.picture] : [];

  // Use what we have
  const base = imgs.length > 0 ? imgs : fallback;

  const padded = [...base];
  while (padded.length < 6 && padded.length > 0) padded.push(base[padded.length % base.length]);
  const limited = padded.slice(0, 8);

  return limited.map((src, idx) => ({
    original: src,
    thumbnail: src,
    originalAlt: `Property image ${idx + 1}`,
    thumbnailAlt: `Thumbnail ${idx + 1}`
  }));
}

export default function PropertyGallery({ property }) {
  const items = useMemo(() => buildGalleryItems(property), [property]);

  if (!items.length) {
    return <p className="muted">No images available.</p>;
  }

  return (
    <div className="gallery-wrap">
      <ImageGallery
        items={items}
        showPlayButton={false}
        showNav={true}
        showFullscreenButton={true}
        thumbnailPosition="bottom"
      />
    </div>
  );
}
