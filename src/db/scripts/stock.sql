create extension if not exists "uuid-ossp";

Create table "Stock" (
  id uuid primary key default uuid_generate_v4(),
  count INTEGER NOT NULL,
  productId uuid NOT NULL,
  foreign key ("productId") references "Products" ("id")
);


INSERT INTO "Stock" ("productId", count) VALUES ('8b405eca-c072-4fe3-a0b7-af575f38cdb5', 5);
INSERT INTO "Stock" ("productId", count) VALUES ('6b51e60e-1498-4c02-bec9-337d30f6b492', 9);