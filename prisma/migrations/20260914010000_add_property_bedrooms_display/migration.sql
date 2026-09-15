-- Preserve a free-form public bedrooms label such as "2 o 4 habitaciones".
ALTER TABLE "Property" ADD COLUMN "bedroomsDisplay" TEXT;
