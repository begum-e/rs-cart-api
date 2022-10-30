create extension if not exists "uuid-ossp";
Create table "Cart" (
  id uuid primary key default uuid_generate_v4(),
  createdAt date NOT NULL,
  updatedAt date NOT NULL
);
insert into "Cart" (createdAt, updatedAt) values
  (now(), now());
create table "CartItem" (
  id uuid primary key default uuid_generate_v4(),
  "cartId" text,
  "productId" uuid,
  count integer,
  "orderId" text,
  foreign key ("cartId") references "Cart" ("id")
  foreign key ("cartId") references "Cart" ("id"),
  foreign key ("orderId") references "Order" ("id")
);

INSERT INTO "CartItem" ("cartId", "productId", count) VALUES 