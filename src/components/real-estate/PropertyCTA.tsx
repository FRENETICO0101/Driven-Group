'use client';

import { useState, useRef } from 'react';
import { createLeadAction } from '@/server/actions/lead.actions';
import type { Property } from '@/lib/types';

type FormState = 'idle' | 'form' | 'loading' | 'success' | 'error';

interface PropertyCTAProps {
  property: Property;
}

const INPUT_CLASS =
  'w-full bg-black/50 border border-dark-gray rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray focus:outline-none focus:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed';

export function PropertyCTA({ property }: PropertyCTAProps) {
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const agentInfo = property.agent;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('loading');
    setErrorMsg('');

    const data = new FormData(e.currentTarget);

    const result = await createLeadAction({
      name: data.get('name') as string,
      email: data.get('email') as string,
      phone: data.get('phone') as string,
      message: data.get('message') as string || undefined,
      propertyId: property.id,
    });

    if (result.success) {
      setState('success');
      formRef.current?.reset();
    } else {
      setState('error');
      setErrorMsg(result.error ?? 'Error al enviar la consulta');
    }
  };

  return (
    <div className="glass-card border border-dark-gray/30 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 sticky top-20 sm:top-24">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Agendar Consulta</h2>
        <p className="text-gray text-sm sm:text-base">
          Nuestro equipo está disponible para discutir esta oportunidad de inversión.
        </p>
      </div>

      {state === 'idle' && (
        <button
          onClick={() => setState('form')}
          className="w-full quartz-button py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-transform hover:scale-105"
        >
          Solicitar Información
        </button>
      )}

      {state === 'success' && (
        <div className="py-4 text-center space-y-2">
          <p className="text-white font-semibold text-sm sm:text-base">Consulta recibida</p>
          <p className="text-gray text-xs sm:text-sm">
            Un asesor se pondrá en contacto en las próximas 24 horas.
          </p>
          <button
            onClick={() => setState('idle')}
            className="text-primary/70 hover:text-primary text-xs sm:text-sm transition-colors mt-2"
          >
            Enviar otra consulta
          </button>
        </div>
      )}

      {(state === 'form' || state === 'loading' || state === 'error') && (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Nombre completo"
            required
            disabled={state === 'loading'}
            className={INPUT_CLASS}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            disabled={state === 'loading'}
            className={INPUT_CLASS}
          />
          <input
            name="phone"
            type="tel"
            placeholder="Teléfono"
            required
            disabled={state === 'loading'}
            className={INPUT_CLASS}
          />
          <textarea
            name="message"
            placeholder="Mensaje (opcional)"
            rows={3}
            disabled={state === 'loading'}
            className={INPUT_CLASS}
          />

          {state === 'error' && (
            <p className="text-red-400 text-xs sm:text-sm">{errorMsg}</p>
          )}

          <div className="flex gap-2 sm:gap-3">
            <button
              type="submit"
              disabled={state === 'loading'}
              className="flex-1 quartz-button py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all disabled:opacity-50"
            >
              {state === 'loading' ? 'Enviando...' : 'Enviar'}
            </button>
            <button
              type="button"
              disabled={state === 'loading'}
              onClick={() => { setState('idle'); setErrorMsg(''); }}
              className="flex-1 bg-black/50 border border-dark-gray text-white py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-colors hover:bg-dark-gray disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="pt-4 sm:pt-6 border-t border-dark-gray/30">
        <p className="text-gray text-xs sm:text-sm mb-2 font-medium uppercase tracking-tight">Contacto directo:</p>
        <div className="space-y-1">
          <p className="text-white font-semibold text-sm sm:text-base">{agentInfo.name}</p>
          <a
            href={`mailto:${agentInfo.email}`}
            className="text-primary/70 hover:text-primary text-xs sm:text-sm transition-colors break-all"
          >
            {agentInfo.email}
          </a>
        </div>
      </div>
    </div>
  );
}
