-- Store a client-entered availability date without imposing a date format.
ALTER TABLE "Property" ADD COLUMN "availableFrom" TEXT;
