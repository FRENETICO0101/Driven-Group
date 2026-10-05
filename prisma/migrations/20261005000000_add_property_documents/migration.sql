-- Allow floorplans and brochures to be managed from the administration panel.
ALTER TABLE "Property"
ADD COLUMN IF NOT EXISTS "documentsManaged" BOOLEAN NOT NULL DEFAULT false;

DO $$
BEGIN
  CREATE TYPE "PropertyDocumentType" AS ENUM ('FLOORPLAN', 'BROCHURE');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "PropertyDocument" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "type" "PropertyDocumentType" NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  "propertyId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PropertyDocument_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "PropertyDocument_propertyId_fkey"
    FOREIGN KEY ("propertyId") REFERENCES "Property"("id")
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "PropertyDocument_propertyId_idx"
ON "PropertyDocument"("propertyId");
