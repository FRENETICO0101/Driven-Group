-- AlterTable: Update User model for auth
ALTER TABLE "User"
  DROP COLUMN "password",
  ADD COLUMN "hashedPassword" TEXT,
  ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable: Make Inquiry.propertyId optional
ALTER TABLE "Inquiry"
  ALTER COLUMN "propertyId" DROP NOT NULL;
