"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { parisToSeattleStops } from "@/content/parisToSeattleGame";

// Served from /public/leaflet/ rather than imported from node_modules —
// Turbopack doesn't resolve leaflet's dist/images/*.png imports to the
// {src} object Next's static-image handling normally produces, which
// left iconUrl/iconRetinaUrl/shadowUrl undefined at runtime.
const DEFAULT_ICON = L.icon({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type LatLng = [number, number];

// Plain lat/lng crosses the antimeridian the "wrong" way — a straight
// line from Melbourne (144.96°) to Hawaii (-157.86°) would draw west
// through the Atlantic instead of east across the Pacific. Unwrapping
// each hop to whichever direction is under 180° away from the previous
// point fixes that, without needing to hardcode which legs need +360.
function unwrapLongitudes(points: LatLng[]): LatLng[] {
  const result: LatLng[] = [];
  let prevLng: number | null = null;
  for (const [lat, lng] of points) {
    let adjusted = lng;
    if (prevLng !== null) {
      while (adjusted - prevLng > 180) adjusted -= 360;
      while (adjusted - prevLng < -180) adjusted += 360;
    }
    prevLng = adjusted;
    result.push([lat, adjusted]);
  }
  return result;
}

// A same-two-points-reversed leg (Melbourne -> Paris, then later
// Paris -> Melbourne/Australia) would otherwise draw as one identical
// straight line twice. Bowing each segment to the left of its own
// direction of travel makes outbound and return arcs land on opposite
// sides automatically, since reversing the endpoints flips the sign of
// the perpendicular offset.
function curvedArc(
  [lat1, lng1]: LatLng,
  [lat2, lng2]: LatLng,
  bend = 0.08,
  steps = 48,
): LatLng[] {
  const midLat = (lat1 + lat2) / 2;
  const midLng = (lng1 + lng2) / 2;
  const dLat = lat2 - lat1;
  const dLng = lng2 - lng1;
  const controlLat = midLat + dLng * bend;
  const controlLng = midLng - dLat * bend;

  const points: LatLng[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const lat =
      (1 - t) * (1 - t) * lat1 + 2 * (1 - t) * t * controlLat + t * t * lat2;
    const lng =
      (1 - t) * (1 - t) * lng1 + 2 * (1 - t) * t * controlLng + t * t * lng2;
    points.push([lat, lng]);
  }
  return points;
}

export function JourneyMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
    });
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    const rawCoords = parisToSeattleStops.map(
      (stop) => stop.coords as LatLng,
    );
    const unwrapped = unwrapLongitudes(rawCoords);

    parisToSeattleStops.forEach((stop, i) => {
      L.marker(unwrapped[i], { icon: DEFAULT_ICON })
        .addTo(map)
        .bindPopup(`<strong>${stop.place}</strong><br />${stop.years}`);
    });

    for (let i = 0; i < unwrapped.length - 1; i++) {
      L.polyline(curvedArc(unwrapped[i], unwrapped[i + 1]), {
        color: "oklch(0.665 0.178 20.1)",
        weight: 2,
        dashArray: "6 6",
      }).addTo(map);
    }

    map.fitBounds(L.latLngBounds(unwrapped), { padding: [32, 32] });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-80 md:h-96 w-full rounded-sm overflow-hidden ring-1 ring-border"
      role="img"
      aria-label="Map of Ambrose Patterson's journey from Melbourne to Paris to Hawaii to Seattle"
    />
  );
}
