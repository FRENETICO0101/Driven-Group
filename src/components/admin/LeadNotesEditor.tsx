'use client';

import { useState, useTransition } from 'react';
import { updateInquiryNotesAction } from '@/server/actions/inquiry.actions';

export function LeadNotesEditor({ inquiryId, initialNotes }: { inquiryId: string; initialNotes?: string }) {
  const [notes, setNotes] = useState(initialNotes ?? '');
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    setMessage(null);
    startTransition(async () => {
      const result = await updateInquiryNotesAction(inquiryId, notes);
      setMessage(result.success ? 'Notas guardadas' : result.error ?? 'No se pudieron guardar las notas');
    });
  };

  return (
    <div>
      <label htmlFor="lead-notes" className="text-xs uppercase text-gray">Notas internas</label>
      <p className="mt-1 text-xs text-dark-gray">Solo visibles dentro del panel administrativo.</p>
      <textarea
        id="lead-notes"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        maxLength={5000}
        rows={5}
        disabled={isPending}
        placeholder="Registra acuerdos, próximos pasos o contexto de seguimiento."
        className="mt-3 w-full rounded-lg border border-light-gray bg-white px-3 py-2 text-sm text-black outline-none placeholder:text-gray focus:border-black disabled:opacity-60"
      />
      <div className="mt-2 flex items-center gap-3">
        <button type="button" disabled={isPending} onClick={handleSave} className="rounded-lg bg-black px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-dark-gray disabled:opacity-60">
          {isPending ? 'Guardando…' : 'Guardar notas'}
        </button>
        {message && <span className="text-xs text-dark-gray" role="status">{message}</span>}
      </div>
    </div>
  );
}
