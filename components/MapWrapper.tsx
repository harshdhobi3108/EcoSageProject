"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";

// Fix marker icons (important for Leaflet with Next.js)
import "leaflet/dist/leaflet.css";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Props = {
  position: { lat: number; lng: number };
};

export default function MapWrapper({ position }: Props) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!position || typeof position.lat !== "number" || typeof position.lng !== "number") {
      console.warn("❌ Invalid coordinates passed to MapWrapper:", position);
      return;
    }

    if (!mapRef.current) {
      const map = L.map("map", {
        center: position,
        zoom: 13,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      const marker = L.marker(position).addTo(map);
      marker.bindPopup("<b>📍 I am here</b>").openPopup();
      markerRef.current = marker;

      mapRef.current = map;
    } else {
      mapRef.current.setView(position, 13);

      if (markerRef.current) {
        markerRef.current.setLatLng(position);
      } else {
        const marker = L.marker(position).addTo(mapRef.current);
        marker.bindPopup("<b>📍 I am here</b>").openPopup();
        markerRef.current = marker;
      }
    }
  }, [position]);

  return <div id="map" style={{ height: "400px", width: "100%", borderRadius: "1rem" }} />;
}
