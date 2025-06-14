import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { fixLeafletIcon } from "@/lib/fixLeafletIcon"; // ✅ Path alias
import "leaflet/dist/leaflet.css";

export default function MapComponent({ position }: { position: LatLngExpression }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    fixLeafletIcon(); // ✅ Fix the marker icons
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div style={{ height: "400px", width: "100%", borderRadius: "1rem", overflow: "hidden", marginTop: "1rem" }}>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>You are here!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
