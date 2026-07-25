'use client';

import { useState, useTransition } from 'react';
import { updateInquiryStatusAction } from '@/server/actions/inquiry.actions';
import type { InquiryStatus } from '@/lib/types';

const statusLabels: Record<InquiryStatus, string> = {
  NEW: 'Nuevo',
  CONTACTED: 'Contactado',
  QUALIFIED: 'Calificado',
  NEGOTIATING: 'En negociación',
  CLOSED: 'Cerrado',
  LOST: 'Descartado',
};

export function LeadStatusControl({ inquiryId, status }: { inquiryId: string; status: InquiryStatus }) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleChange = (nextStatus: InquiryStatus) => {
    setMessage(null);
    startTransition(async () => {
      const result = await updateInquiryStatusAction(inquiryId, nextStatus);
      if (!result.success) {
        setMessage(result.error || 'No se pudo guardar el estado');
        return;
      }
      setCurrentStatus(nextStatus);
      setMessage('Estado actualizado');
    });
  };

  return (
    <div>
      <label htmlFor="lead-status" className="text-xs uppercase text-gray">Estado</label>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <select
          id="lead-status"
          value={currentStatus}
          disabled={isPending}
          onChange={(event) => handleChange(event.target.value as InquiryStatus)}
          className="rounded-lg border border-light-gray bg-white px-3 py-2 text-sm text-black outline-none focus:border-black disabled:opacity-60"
        >
          {Object.entries(statusLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {message && <span className="text-xs text-dark-gray" role="status">{message}</span>}
      </div>
    </div>
  );
}
