'use client';

import { MapContainer, TileLayer, GeoJSON, Popup, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState, useRef } from 'react';
import type { Property } from '@/lib/types';

// Fix default Leaflet icon paths (Next.js asset handling)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom dark pin icon
const propertyIcon = L.divIcon({
  html: `<div style="
    width:12px;height:12px;
    background:#1a1a1a;
    border:2px solid #ffffff;
    border-radius:50%;
    box-shadow:0 1px 4px rgba(0,0,0,0.4);
  "></div>`,
  className: '',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
  popupAnchor: [0, -10],
});

const activePropertyIcon = L.divIcon({
  html: `<div style="
    width:16px;height:16px;
    background:#1a1a1a;
    border:3px solid #ffffff;
    border-radius:50%;
    box-shadow:0 2px 8px rgba(0,0,0,0.5);
  "></div>`,
  className: '',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -12],
});

const DISTRICT_LABELS: Record<string, string> = {
  Brickell:        'Financial hub with luxury high-rises',
  'Downtown Miami':'Urban core and cultural center',
  Wynwood:         'Arts, culture & creative district',
  'Design District':'Luxury shopping & design hub',
  'Midtown Miami': 'Mixed-use residential area',
  'Coconut Grove': 'Bohemian village & boutiques',
  Allapattah:      'Emerging residential neighborhood',
};

// Fly to district on filter change
function MapFlyTo({ district, districtData }: { district?: string; districtData: any }) {
  const map = useMap();
  useEffect(() => {
    if (!district || !districtData) {
      map.flyTo([25.7614, -80.1986], 12, { duration: 1.2 });
      return;
    }
    const feature = districtData.features.find(
      (f: any) => f.properties.name === district
    );
    if (!feature) return;
    const layer = L.geoJSON(feature);
    const bounds = layer.getBounds();
    if (bounds.isValid()) map.flyToBounds(bounds, { padding: [40, 40], duration: 1.2 });
  }, [district, districtData, map]);
  return null;
}

interface MiamiPropertyMapProps {
  properties: Property[];
  selectedDistrict?: string;
  onDistrictClick?: (district: string) => void;
}

export function MiamiPropertyMap({
  properties,
  selectedDistrict,
  onDistrictClick,
}: MiamiPropertyMapProps) {
  const [districtData, setDistrictData] = useState<any>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const geoJsonRef = useRef<any>(null);

  useEffect(() => {
    fetch('/geojson/miami-districts.geojson')
      .then((res) => res.json())
      .then(setDistrictData)
      .catch((err) => console.error('GeoJSON load error:', err));
  }, []);

  // Properties that have valid coordinates
  const mappableProperties = properties.filter(
    (p) => typeof p.latitude === 'number' && typeof p.longitude === 'number'
  );

  const filteredProperties = selectedDistrict
    ? mappableProperties.filter((p) => p.district === selectedDistrict)
    : mappableProperties;

  const districtStyle = (feature: any) => {
    const isSelected = selectedDistrict && feature?.properties?.name === selectedDistrict;
    const isHovered  = hoveredDistrict && feature?.properties?.name === hoveredDistrict;
    const baseColor  = feature?.properties?.color || '#6b6b6b';

    return {
      fillColor: baseColor,
      weight:    isSelected ? 2.5 : isHovered ? 2 : 1,
      opacity:   1,
      color:     isSelected ? '#1a1a1a' : isHovered ? '#3a3a3a' : '#999999',
      dashArray: isSelected ? '' : '4',
      fillOpacity: isSelected ? 0.28 : isHovered ? 0.22 : 0.12,
    };
  };

  const onEachDistrict = (feature: any, layer: any) => {
    const name: string = feature.properties.name;

    layer.on('mouseover', () => {
      setHoveredDistrict(name);
      layer.setStyle({
        fillOpacity: 0.22,
        weight: 2,
        dashArray: '',
      });
    });

    layer.on('mouseout', () => {
      setHoveredDistrict(null);
      layer.setStyle(districtStyle(feature));
    });

    layer.on('click', () => {
      onDistrictClick?.(name === selectedDistrict ? '' : name);
    });

    layer.bindTooltip(
      `<div style="font-family:sans-serif;font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#1a1a1a">${name}</div>`,
      { sticky: true, className: 'leaflet-tooltip-district' }
    );
  };

  // Count properties per district for the legend
  const propertiesByDistrict = properties.reduce<Record<string, number>>((acc, p) => {
    if (p.district) acc[p.district] = (acc[p.district] || 0) + 1;
    return acc;
  }, {});

  const allDistricts = districtData?.features?.map((f: any) => f.properties.name) || [];

  return (
    <div className="flex flex-col gap-4">
      {/* Map */}
      <div className="w-full h-[420px] md:h-[520px] rounded-none overflow-hidden border border-light-gray relative">
        <MapContainer
          center={[25.7614, -80.1986]}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
          scrollWheelZoom={false}
        >
          {/* Minimal greyscale tile layer */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
            maxZoom={18}
          />
          {/* Road labels only on top */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
            maxZoom={18}
          />

          {/* Fly to selected district */}
          <MapFlyTo district={selectedDistrict} districtData={districtData} />

          {/* Districts GeoJSON */}
          {districtData && (
            <GeoJSON
              key={selectedDistrict ?? 'all'}
              ref={geoJsonRef}
              data={districtData}
              style={districtStyle}
              onEachFeature={onEachDistrict}
            />
          )}

          {/* Property markers */}
          {filteredProperties.map((property) => (
            <Marker
              key={property.id}
              position={[property.latitude!, property.longitude!]}
              icon={property.district === selectedDistrict ? activePropertyIcon : propertyIcon}
            >
              <Popup
                className="property-popup"
                closeButton={false}
                maxWidth={220}
              >
                <div style={{ fontFamily: 'sans-serif', padding: '2px 0' }}>
                  <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8e8e8e', marginBottom: 4 }}>
                    {property.district || property.city}
                  </p>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.3, marginBottom: 4 }}>
                    {property.title}
                  </p>
                  <p style={{ fontSize: '11px', color: '#6b6b6b', marginBottom: 6 }}>
                    {property.address}
                  </p>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a' }}>
                    ${(property.price / 1_000_000).toFixed(1)}M
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Zoom controls — custom, positioned top-right */}
        <div className="absolute top-3 right-3 z-[500] flex flex-col shadow-sm">
          {/* handled by leaflet default removed above — kept minimal */}
        </div>
      </div>

      {/* District Legend */}
      <div className="border border-light-gray p-4">
        <p className="editorial-label text-gray mb-3">Miami Districts</p>
        <div className="flex flex-col gap-2">
          {allDistricts.map((district: string) => {
            const feat   = districtData?.features?.find((f: any) => f.properties.name === district);
            const color  = feat?.properties?.color || '#6b6b6b';
            const count  = propertiesByDistrict[district] || 0;
            const active = selectedDistrict === district;

            return (
              <button
                key={district}
                onClick={() => onDistrictClick?.(active ? '' : district)}
                className={`flex items-center justify-between w-full px-2 py-1.5 text-left transition-colors duration-200 ${
                  active ? 'bg-ink text-white' : 'hover:bg-pale text-ink'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className="inline-block w-2.5 h-2.5 flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs font-medium">{district}</span>
                </span>
                {count > 0 && (
                  <span className={`text-[10px] font-semibold ${active ? 'text-light-gray' : 'text-gray'}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {selectedDistrict && (
          <button
            onClick={() => onDistrictClick?.('')}
            className="mt-3 w-full text-xs text-mid-gray hover:text-ink transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 12 }}>close</span>
            Clear district filter
          </button>
        )}
      </div>
    </div>
  );
}
