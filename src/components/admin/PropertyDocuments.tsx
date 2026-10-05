'use client';

import { useState } from 'react';
import {
  addPropertyDocumentAction,
  deletePropertyDocumentAction,
  getCloudinaryUploadSignatureAction,
  reorderPropertyDocumentsAction,
} from '@/server/actions/property.actions';
import type { PropertyDocument, PropertyDocumentType } from '@/lib/types';

interface PropertyDocumentsProps {
  propertyId: string;
  documents: PropertyDocument[];
}

export function PropertyDocuments({ propertyId, documents: initialDocuments }: PropertyDocumentsProps) {
  const [documents, setDocuments] = useState(initialDocuments);
  const [files, setFiles] = useState<File[]>([]);
  const [type, setType] = useState<PropertyDocumentType>('FLOORPLAN');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState<string | null>(null);

  const upload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!files.length) return setError('Selecciona uno o varios archivos PDF');
    const invalid = files.find((file) => file.type !== 'application/pdf' || file.size > 20 * 1024 * 1024);
    if (invalid) return setError(`${invalid.name}: debe ser PDF y pesar máximo 20 MB`);
    setError(null);
    setIsLoading(true);
    try {
      const signed = await getCloudinaryUploadSignatureAction('documents');
      if (!signed.success) throw new Error(signed.error);
      const added: PropertyDocument[] = [];
      for (const [index, file] of files.entries()) {
        setProgress(`Subiendo ${index + 1} de ${files.length}: ${file.name}`);
        const data = new FormData();
        data.set('file', file);
        data.set('api_key', signed.data.apiKey);
        data.set('timestamp', String(signed.data.timestamp));
        data.set('folder', signed.data.folder);
        data.set('signature', signed.data.signature);
        const response = await fetch(`https://api.cloudinary.com/v1_1/${signed.data.cloudName}/image/upload`, { method: 'POST', body: data });
        const payload = await response.json() as { secure_url?: string; error?: { message?: string } };
        if (!response.ok || !payload.secure_url) throw new Error(payload.error?.message || `No fue posible subir ${file.name}`);
        const result = await addPropertyDocumentAction(propertyId, file.name.replace(/\.pdf$/i, ''), payload.secure_url, type);
        if (!result.success || !result.data) throw new Error(result.error || `No fue posible registrar ${file.name}`);
        added.push(result.data);
      }
      setDocuments((current) => [...current, ...added]);
      setFiles([]);
      form.reset();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Ocurrió un error inesperado');
    } finally {
      setProgress('');
      setIsLoading(false);
    }
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= documents.length) return;
    const previous = documents;
    const reordered = [...documents];
    [reordered[index], reordered[target]] = [reordered[target]!, reordered[index]!];
    setDocuments(reordered);
    const result = await reorderPropertyDocumentsAction(reordered.map((document) => document.id));
    if (!result.success) {
      setDocuments(previous);
      setError(result.error || 'No fue posible reordenar los documentos');
    }
  };

  const remove = async (documentId: string) => {
    if (!confirm('¿Deseas eliminar este documento?')) return;
    setIsLoading(true);
    const result = await deletePropertyDocumentAction(documentId);
    setIsLoading(false);
    if (!result.success) return setError(result.error || 'No fue posible eliminar el documento');
    setDocuments((current) => current.filter((document) => document.id !== documentId));
  };

  return (
    <section className="space-y-6 rounded-xl border border-light-gray bg-white p-8">
      <div>
        <h2 className="text-2xl font-serif text-black">Planos de planta y brochures</h2>
        <p className="mt-2 text-sm text-dark-gray">Sube uno o varios PDF para mostrarlos en la ficha pública.</p>
      </div>
      {error && <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</div>}
      <form onSubmit={upload} className="grid gap-4 md:grid-cols-[180px_1fr_auto] md:items-end">
        <label className="block text-sm font-semibold text-black">Tipo
          <select value={type} onChange={(event) => setType(event.target.value as PropertyDocumentType)} className="mt-2 w-full rounded-lg border border-light-gray px-3 py-3">
            <option value="FLOORPLAN">Plano de planta</option>
            <option value="BROCHURE">Brochure</option>
          </select>
        </label>
        <label className="block text-sm font-semibold text-black">Archivos PDF
          <input type="file" multiple accept="application/pdf,.pdf" onChange={(event) => setFiles(Array.from(event.target.files || []))} className="mt-2 block w-full text-sm text-dark-gray file:mr-4 file:rounded-lg file:border-0 file:bg-black file:px-4 file:py-2.5 file:font-semibold file:text-white" />
        </label>
        <button type="submit" disabled={isLoading} className="rounded-lg bg-black px-5 py-3 font-semibold text-white disabled:opacity-50">{isLoading ? (progress || 'Subiendo...') : files.length > 1 ? `Agregar ${files.length} documentos` : 'Agregar documento'}</button>
      </form>
      {documents.length === 0 ? <p className="py-6 text-center text-dark-gray">Aún no hay planos ni brochures.</p> : (
        <div className="space-y-3">
          {documents.map((document, index) => (
            <div key={document.id} className="flex flex-wrap items-center gap-3 rounded-lg border border-light-gray p-4">
              <span className="rounded-full bg-light-gray/50 px-3 py-1 text-xs font-semibold">{document.type === 'FLOORPLAN' ? 'Plano' : 'Brochure'}</span>
              <a href={document.url} target="_blank" rel="noreferrer" className="min-w-0 flex-1 truncate font-semibold underline">{document.name}</a>
              <button type="button" onClick={() => move(index, -1)} disabled={index === 0 || isLoading} className="rounded border border-light-gray px-3 py-2 disabled:opacity-40">↑</button>
              <button type="button" onClick={() => move(index, 1)} disabled={index === documents.length - 1 || isLoading} className="rounded border border-light-gray px-3 py-2 disabled:opacity-40">↓</button>
              <button type="button" onClick={() => remove(document.id)} disabled={isLoading} className="rounded border border-red-200 px-3 py-2 text-red-700 disabled:opacity-40">Eliminar</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
