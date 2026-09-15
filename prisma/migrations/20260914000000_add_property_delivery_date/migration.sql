-- Store a client-entered delivery date without imposing a date format.
ALTER TABLE "Property" ADD COLUMN "deliveryDate" TEXT;
