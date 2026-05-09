'use client';

import { useState } from 'react';
import type { Property } from '@/lib/types';

interface PropertyCTAProps {
  property: Property;
}

export function PropertyCTA({ property }: PropertyCTAProps) {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Implementación futura: enviar formulario al servidor
    setTimeout(() => {
      setIsLoading(false);
      setShowForm(false);
    }, 500);
  };

  const agentInfo = property.agent;

  return (
    <div className="glass-card border border-slate-700/30 rounded-xl p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Agendar Consulta</h2>
        <p className="text-slate-400">
          Nuestro equipo está disponible para discutir esta oportunidad de inversión.
        </p>
      </div>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full quartz-button py-3 rounded-lg font-semibold transition-transform hover:scale-105"
        >
          Solicitar Información
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre completo"
            required
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50"
          />
          <input
            type="tel"
            placeholder="Teléfono"
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50"
          />
          <textarea
            placeholder="Mensaje (opcional)"
            rows={3}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 quartz-button py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
            >
              {isLoading ? 'Enviando...' : 'Enviar'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 bg-slate-800/50 border border-slate-700 text-white py-3 rounded-lg font-semibold transition-colors hover:bg-slate-700"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="pt-6 border-t border-slate-700/30">
        <p className="text-slate-400 text-sm mb-2">Contacto directo:</p>
        <div className="space-y-1">
          <p className="text-white font-semibold">{agentInfo.name}</p>
          <a href={`mailto:${agentInfo.email}`} className="text-primary/70 hover:text-primary text-sm">
            {agentInfo.email}
          </a>
        </div>
      </div>
    </div>
  );
}
