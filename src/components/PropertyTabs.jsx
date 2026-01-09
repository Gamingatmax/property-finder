import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function getMapEmbedUrl(property) {
  // No API key needed. Uses Google Maps embed by lat/lng if present.
  if (property?.lat != null && property?.lng != null) {
    return `https://www.google.com/maps?q=${property.lat},${property.lng}&output=embed`;
  }

  // Fallback: use the text location
  const q = encodeURIComponent(property?.location || "");
  return `https://www.google.com/maps?q=${q}&output=embed`;
}

export default function PropertyTabs({ property }) {
  const mapUrl = getMapEmbedUrl(property);

  return (
    <div className="tabs-wrap">
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <h3>Full description</h3>
          <p>{property?.descriptionLong || "No description available."}</p>
        </TabPanel>

        <TabPanel>
          <h3>Floor plan</h3>
          {property?.floorPlan ? (
            <img
              src={property.floorPlan}
              alt="Floor plan"
              className="floorplan"
            />
          ) : (
            <p className="muted">No floor plan available.</p>
          )}
        </TabPanel>

        <TabPanel>
          <h3>Location</h3>
          <div className="map-wrap">
            <iframe
              title="Google Map"
              src={mapUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
