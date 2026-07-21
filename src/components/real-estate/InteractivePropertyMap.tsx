"use client";

import { useEffect, useMemo } from "react";
import { divIcon, latLngBounds } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { Property } from "@/lib/types";

interface InteractivePropertyMapProps {
  properties: Property[];
  selectedSlug?: string;
  onSelect?: (property: Property) => void;
  className?: string;
  viewport?: "properties" | "miami";
  expanded?: boolean;
  restrictToMiami?: boolean;
}

type MappedProperty = Property & { latitude: number; longitude: number };
const MIAMI_CENTER: [number, number] = [25.7617, -80.1918];
const MIAMI_BOUNDS: [[number, number], [number, number]] = [[25.68, -80.32], [25.9, -80.12]];

function MapViewport({ properties, selectedSlug, viewport, expanded }: { properties: MappedProperty[]; selectedSlug?: string; viewport: "properties" | "miami"; expanded: boolean }) {
  const map = useMap();

  useEffect(() => {
    if (viewport === "miami") {
      map.setView(MIAMI_CENTER, 11);
      return;
    }

    const selected = properties.find((property) => property.slug === selectedSlug);
    if (selected) {
      map.flyTo([selected.latitude, selected.longitude], 15, { duration: 0.6 });
      return;
    }

    if (properties.length === 1) {
      map.setView([properties[0].latitude, properties[0].longitude], 15);
      return;
    }

    map.fitBounds(latLngBounds(properties.map((property) => [property.latitude, property.longitude])), { padding: [32, 32] });
  }, [map, properties, selectedSlug, viewport]);

  useEffect(() => {
    map.invalidateSize({ animate: true });
  }, [expanded, map]);

  return null;
}

const markerIcon = divIcon({
  className: "driven-property-marker",
  html: '<span aria-hidden="true"></span>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export function InteractivePropertyMap({ properties, selectedSlug, onSelect, className = "", viewport = "properties", expanded = false, restrictToMiami = false }: InteractivePropertyMapProps) {
  const mappedProperties = useMemo(
    () => properties.filter((property): property is MappedProperty => Number.isFinite(property.latitude) && Number.isFinite(property.longitude)),
    [properties],
  );

  if (mappedProperties.length === 0) return null;

  const initialCenter: [number, number] = viewport === "miami" ? MIAMI_CENTER : [mappedProperties[0].latitude, mappedProperties[0].longitude];

  return (
    <div className={`overflow-hidden rounded-xl border border-light-gray ${className}`}>
      <MapContainer
        center={initialCenter}
        zoom={viewport === "miami" ? 11 : 13}
        minZoom={viewport === "miami" || restrictToMiami ? 11 : undefined}
        maxBounds={viewport === "miami" || restrictToMiami ? MIAMI_BOUNDS : undefined}
        maxBoundsViscosity={viewport === "miami" || restrictToMiami ? 1 : undefined}
        scrollWheelZoom
        className={`${expanded ? "h-full min-h-[24rem]" : "h-64 sm:h-80"} w-full`}
        aria-label="Mapa de propiedades"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
        />
        <MapViewport properties={mappedProperties} selectedSlug={selectedSlug} viewport={viewport} expanded={expanded} />
        {mappedProperties.map((property) => (
          <Marker
            key={property.id}
            position={[property.latitude, property.longitude]}
            icon={markerIcon}
            eventHandlers={{ click: () => onSelect?.(property) }}
          >
            <Popup>
              <p className="font-semibold text-black">{property.title}</p>
              <p className="mt-1 text-sm text-dark-gray">{property.city}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
