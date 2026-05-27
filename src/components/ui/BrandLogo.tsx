import React from 'react';

interface BrandLogoProps {
  className?: string;
  fill?: string;
}

export function BrandLogo({ className = "w-8 h-8", fill = "currentColor" }: BrandLogoProps) {
  return (
    <svg 
      viewBox="0 0 440 214" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Driven Group Logo"
    >
      {/* 
        Isotipo: Tres triángulos equiláteros idénticos.
        El triángulo central está desplazado hacia arriba, creando el espacio en 'V'
        y haciendo que su borde superior sobresalga, coincidiendo exactamente con la imagen.
      */}
      {/* Triángulo Izquierdo */}
      <polygon points="0,213 200,213 100,40" fill={fill} />
      
      {/* Triángulo Derecho */}
      <polygon points="240,213 440,213 340,40" fill={fill} />
      
      {/* Triángulo Central (hacia abajo, elevado) */}
      <polygon points="120,0 320,0 220,173" fill={fill} />
    </svg>
  );
}
