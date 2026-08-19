"use client";

import { useEffect, useMemo, useRef } from "react";
import { divIcon, latLngBounds } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap, ZoomControl } from "react-leaflet";
import { useTranslations } from "next-intl";
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
  const previousSelectedSlug = useRef<string | undefined>(selectedSlug);

  useEffect(() => {
    if (viewport === "miami") {
      const selectionChanged = previousSelectedSlug.current !== selectedSlug;
      previousSelectedSlug.current = selectedSlug;
      if (selectionChanged && selectedSlug) {
        const selected = properties.find((property) => property.slug === selectedSlug);
        if (selected) map.flyTo([selected.latitude, selected.longitude], 14, { duration: 0.6 });
        return;
      }
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

function getMarkerIcon(isSelected: boolean) {
  return divIcon({
    className: `driven-property-marker${isSelected ? " driven-property-marker-selected" : ""}`,
    html: '<span aria-hidden="true"></span>',
    iconSize: isSelected ? [32, 32] : [24, 24],
    iconAnchor: isSelected ? [16, 16] : [12, 12],
  });
}

export function InteractivePropertyMap({ properties, selectedSlug, onSelect, className = "", viewport = "properties", expanded = false, restrictToMiami = false }: InteractivePropertyMapProps) {
  const t = useTranslations("properties");
  const mappedProperties = useMemo(
    () => properties.filter((property): property is MappedProperty => Number.isFinite(property.latitude) && Number.isFinite(property.longitude)),
    [properties],
  );

  if (mappedProperties.length === 0) return null;

  const initialCenter: [number, number] = viewport === "miami" ? MIAMI_CENTER : [mappedProperties[0].latitude, mappedProperties[0].longitude];

  return (
    <div className={`relative overflow-hidden rounded-xl border border-light-gray ${className}`}>
      <MapContainer
        center={initialCenter}
        zoom={viewport === "miami" ? 11 : 13}
        minZoom={viewport === "miami" || restrictToMiami ? 10 : undefined}
        maxZoom={19}
        maxBounds={viewport === "miami" || restrictToMiami ? MIAMI_BOUNDS : undefined}
        maxBoundsViscosity={viewport === "miami" || restrictToMiami ? 1 : undefined}
        zoomControl={false}
        wheelPxPerZoomLevel={80}
        scrollWheelZoom
        touchZoom
        doubleClickZoom
        className={`${expanded ? "h-full min-h-[24rem]" : "h-64 sm:h-80"} w-full`}
        aria-label="Mapa de propiedades"
      >
        <ZoomControl position="topright" />
        <TileLayer
          attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          subdomains="abc"
          keepBuffer={6}
          updateWhenZooming={false}
          updateWhenIdle
        />
        <MapViewport properties={mappedProperties} selectedSlug={selectedSlug} viewport={viewport} expanded={expanded} />
        {mappedProperties.map((property) => {
          const isSelected = property.slug === selectedSlug;
          return (
            <Marker
              key={property.id}
              position={[property.latitude, property.longitude]}
              icon={getMarkerIcon(isSelected)}
              zIndexOffset={isSelected ? 1000 : 0}
              riseOnHover
              eventHandlers={{ click: () => onSelect?.(property) }}
            >
              <Popup>
                <p className="font-semibold text-black">{property.title}</p>
                <p className="mt-1 text-sm text-dark-gray">{property.city}</p>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <details className="absolute left-3 top-3 z-[1000] max-w-[14rem] rounded-lg border border-black/10 bg-white/95 text-xs text-dark-gray shadow-sm backdrop-blur-sm">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2 font-semibold text-black [&::-webkit-details-marker]:hidden">
          <span className="material-symbols-outlined text-base">info</span>
          {t("mapHowTo")}
        </summary>
        <p className="border-t border-light-gray px-3 py-2.5 leading-relaxed">{t("mapHowToDescription")}</p>
      </details>
    </div>
  );
}
