create extension if not exists "uuid-ossp";
Create table "Cart" (
  id uuid primary key default uuid_generate_v4(),
  createdAt date NOT NULL,
  updatedAt date NOT NULL
);
insert into "Cart" (createdAt, updatedAt) values
  (now(), now());


