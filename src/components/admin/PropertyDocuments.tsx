'use client';

import { useState } from 'react';
import { upload as uploadToBlob } from '@vercel/blob/client';
import {
  addPropertyDocumentAction,
  deletePropertyDocumentAction,
  reorderPropertyDocumentsAction,
} from '@/server/actions/property.actions';
import type { PropertyDocument, PropertyDocumentType } from '@/lib/types';

interface PropertyDocumentsProps {
  propertyId: string;
  documents: PropertyDocument[];
}

const MAX_DOCUMENT_SIZE_MB = 50;
const MAX_DOCUMENT_SIZE_BYTES = MAX_DOCUMENT_SIZE_MB * 1024 * 1024;

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
    const invalid = files.find((file) => file.type !== 'application/pdf' || file.size > MAX_DOCUMENT_SIZE_BYTES);
    if (invalid) return setError(`${invalid.name}: debe ser PDF y pesar máximo ${MAX_DOCUMENT_SIZE_MB} MB`);
    setError(null);
    setIsLoading(true);
    try {
      const added: PropertyDocument[] = [];
      for (const [index, file] of files.entries()) {
        setProgress(`Subiendo ${index + 1} de ${files.length}: ${file.name}`);
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, '-');
        const blob = await uploadToBlob(`property-documents/${propertyId}/${safeName}`, file, {
          access: 'public',
          handleUploadUrl: '/api/property-documents/upload',
          clientPayload: JSON.stringify({ propertyId }),
          multipart: file.size > 10 * 1024 * 1024,
          onUploadProgress: ({ percentage }) => {
            setProgress(`Subiendo ${index + 1} de ${files.length}: ${Math.round(percentage)}%`);
          },
        });
        const result = await addPropertyDocumentAction(propertyId, file.name.replace(/\.pdf$/i, ''), blob.url, type);
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
    <section id="documentos" className="scroll-mt-6 space-y-5 rounded-xl border border-light-gray bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-serif text-black">Planos de planta y brochures</h2>
          <p className="mt-1 text-sm text-dark-gray">Sube uno o varios PDF para mostrarlos en la ficha pública.</p>
        </div>
        <span className="rounded-full bg-light-gray/40 px-3 py-1.5 text-xs font-semibold text-dark-gray">{documents.length} documentos</span>
      </div>
      {error && <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</div>}
      <form onSubmit={upload} className="grid gap-4 rounded-xl border border-light-gray bg-light-gray/10 p-4 md:grid-cols-[180px_minmax(0,1fr)_auto] md:items-end">
        <label className="block text-sm font-semibold text-black">Tipo
          <select value={type} onChange={(event) => setType(event.target.value as PropertyDocumentType)} className="mt-2 w-full rounded-lg border border-light-gray px-3 py-3">
            <option value="FLOORPLAN">Plano de planta</option>
            <option value="BROCHURE">Brochure</option>
          </select>
        </label>
        <label className="block text-sm font-semibold text-black">Archivos PDF
          <input type="file" multiple accept="application/pdf,.pdf" onChange={(event) => setFiles(Array.from(event.target.files || []))} className="mt-2 block w-full text-sm text-dark-gray file:mr-4 file:rounded-lg file:border-0 file:bg-black file:px-4 file:py-2.5 file:font-semibold file:text-white" />
          <span className="mt-2 block text-xs font-normal text-gray">Máximo {MAX_DOCUMENT_SIZE_MB} MB por archivo.</span>
        </label>
        <button type="submit" disabled={isLoading} className="min-h-12 rounded-lg bg-black px-5 py-3 font-semibold text-white disabled:opacity-50">{isLoading ? (progress || 'Subiendo...') : files.length > 1 ? `Agregar ${files.length} documentos` : 'Agregar documento'}</button>
      </form>
      {documents.length === 0 ? <p className="py-6 text-center text-dark-gray">Aún no hay planos ni brochures.</p> : (
        <div className="grid gap-3 lg:grid-cols-2">
          {documents.map((document, index) => (
            <div key={document.id} className="flex min-w-0 items-center gap-2 rounded-lg border border-light-gray p-3 transition-colors hover:border-dark-gray/50">
              <span className="rounded-full bg-light-gray/50 px-3 py-1 text-xs font-semibold">{document.type === 'FLOORPLAN' ? 'Plano' : 'Brochure'}</span>
              <a href={document.url} target="_blank" rel="noreferrer" title={document.name} className="min-w-0 flex-1 truncate text-sm font-semibold underline">{document.name}</a>
              <button type="button" onClick={() => move(index, -1)} disabled={index === 0 || isLoading} title="Mover arriba" aria-label={`Mover ${document.name} arriba`} className="rounded border border-light-gray px-2.5 py-2 text-sm disabled:opacity-40">↑</button>
              <button type="button" onClick={() => move(index, 1)} disabled={index === documents.length - 1 || isLoading} title="Mover abajo" aria-label={`Mover ${document.name} abajo`} className="rounded border border-light-gray px-2.5 py-2 text-sm disabled:opacity-40">↓</button>
              <button type="button" onClick={() => remove(document.id)} disabled={isLoading} className="rounded border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 disabled:opacity-40">Eliminar</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
