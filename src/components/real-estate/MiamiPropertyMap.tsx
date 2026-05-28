'use client';

import { MapContainer, TileLayer, GeoJSON, Popup, Marker } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import type { Property } from '@/lib/types';

interface MiamiPropertyMapProps {
  properties: Property[];
  selectedDistrict?: string;
}

const customIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAzMiA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgMEMxMC40OTcgMCA2IDQuNDk3IDYgMTBDNiAxNi44MjggMTYgMzAgMTYgMzBDMTYgMzAgMjYgMTYuODI4IDI2IDEwQzI2IDQuNDk3IDIxLjUwMyAwIDE2IDBaIiBmaWxsPSIjMDAwMDAwIi8+PGNpcmNsZSBjeD0iMTYiIGN5PSIxMCIgcj0iNCIgZmlsbD0iI2ZmZmZmZiIvPjwvc3ZnPg==',
  iconSize: [32, 48],
  iconAnchor: [16, 48],
  popupAnchor: [0, -48],
});

export function MiamiPropertyMap({ properties, selectedDistrict }: MiamiPropertyMapProps) {
  const [districtData, setDistrictData] = useState(null);

  useEffect(() => {
    fetch('/geojson/miami-districts.geojson')
      .then((res) => res.json())
      .then(setDistrictData)
      .catch((err) => console.error('[v0] Error loading GeoJSON:', err));
  }, []);

  const filteredProperties = selectedDistrict
    ? properties.filter((p) => p.district === selectedDistrict)
    : properties;

  return (
    <div className="w-full h-96 md:h-screen rounded-lg overflow-hidden border border-light-gray">
      <MapContainer
        center={[25.7814, -80.1866]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        className="z-10"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap contributors &copy; CartoDB'
          maxZoom={18}
        />

        {/* Districts */}
        {districtData && (
          <GeoJSON
            data={districtData}
            style={(feature) => ({
              fillColor: feature?.properties?.color || '#e0e0e0',
              weight: 2,
              opacity: 0.8,
              color: '#999',
              dashArray: '3',
              fillOpacity: 0.4,
            })}
            onEachFeature={(feature, layer) => {
              layer.bindPopup(`<strong>${feature.properties.name}</strong><br/>${feature.properties.description}`);
              layer.on('mouseover', () => {
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 3,
                });
              });
              layer.on('mouseout', () => {
                layer.setStyle({
                  fillOpacity: 0.4,
                  weight: 2,
                });
              });
            }}
          />
        )}

        {/* Property Markers */}
        {filteredProperties.map((property) => (
          <Marker
            key={property.id}
            position={[property.latitude, property.longitude]}
            icon={customIcon}
          >
            <Popup className="max-w-xs">
              <div className="text-sm">
                <h3 className="font-semibold text-black mb-1">{property.title}</h3>
                <p className="text-dark-gray text-xs mb-2">{property.address}</p>
                <p className="text-dark-gray text-xs mb-2">District: {property.district || 'N/A'}</p>
                <p className="font-semibold text-black">${(property.price / 1000000).toFixed(1)}M</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
