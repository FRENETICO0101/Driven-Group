import type { Property } from '@/lib/types';

interface PropertyMapProps {
  property: Property;
}

export function PropertyMap({ property }: PropertyMapProps) {
  const fullAddress = `${property.address}, ${property.city}, ${property.state} ${property.zipCode}`;

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">Ubicación</h2>
      
      {/* 
        Contenedor reservado para la futura integración del mapa dinámico (ej. Google Maps o Mapbox).
        Actualmente muestra un diseño hardcodeado como placeholder visual.
      */}
      <div className="relative w-full h-64 sm:h-80 bg-light-gray/10 rounded-xl border border-light-gray overflow-hidden flex flex-col items-center justify-center group">
        
        {/* Patrón de cuadrícula decorativo para simular un mapa */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-black) 1px, transparent 0)', 
            backgroundSize: '24px 24px' 
          }} 
        />
        
        <div className="relative z-10 flex flex-col items-center text-center p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-light-gray/50 transform transition-transform duration-500 group-hover:scale-105">
          <span className="material-symbols-outlined text-4xl text-black mb-2">location_on</span>
          <p className="text-black font-bold text-lg mb-1">{property.city}</p>
          <p className="text-dark-gray text-sm max-w-xs">{fullAddress}</p>
          
          <div className="mt-4 px-4 py-2 bg-black text-white text-xs font-bold rounded-full uppercase tracking-wider">
            Mapa Interactivo Próximamente
          </div>
        </div>
        
      </div>
    </div>
  );
}
