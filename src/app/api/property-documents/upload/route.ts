import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { auth } from '@/lib/auth';
import { propertyRepository } from '@/server/repositories/property.repository';

export const runtime = 'nodejs';

const MAX_DOCUMENT_SIZE_BYTES = 50 * 1024 * 1024;

export async function POST(request: Request) {
  const body = await request.json() as HandleUploadBody;

  try {
    const response = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const session = await auth();
        if (session?.user?.role !== 'ADMIN') throw new Error('Unauthorized');

        const payload = clientPayload ? JSON.parse(clientPayload) as { propertyId?: string } : {};
        if (!payload.propertyId) throw new Error('Property ID is required');
        const property = await propertyRepository.getById(payload.propertyId);
        if (!property) throw new Error('Property not found');

        const expectedPrefix = `property-documents/${property.id}/`;
        if (!pathname.startsWith(expectedPrefix) || !pathname.toLowerCase().endsWith('.pdf')) {
          throw new Error('Invalid document path');
        }

        return {
          allowedContentTypes: ['application/pdf'],
          maximumSizeInBytes: MAX_DOCUMENT_SIZE_BYTES,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ propertyId: property.id }),
        };
      },
    });

    return Response.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to authorize document upload';
    return Response.json({ error: message }, { status: message === 'Unauthorized' ? 401 : 400 });
  }
}
