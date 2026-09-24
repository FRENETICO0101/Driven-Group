-- Distinguish catalog-backed galleries from galleries intentionally managed in the CMS.
ALTER TABLE "Property"
ADD COLUMN IF NOT EXISTS "galleryManaged" BOOLEAN NOT NULL DEFAULT false;
