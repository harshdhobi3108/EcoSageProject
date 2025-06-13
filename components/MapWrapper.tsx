"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";

type Props = {
  position: { lat: number; lng: number };
};

export default function MapWrapper({ position }: Props) {
  const mapRef = useRef<L.Map | null>(null);

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

      mapRef.current = map;
    } else {
      mapRef.current.setView(position, 13);
    }
  }, [position]);

  return <div id="map" style={{ height: "400px", width: "100%" }} />;
}
