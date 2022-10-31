create table "CartItem" (
  id uuid primary key default uuid_generate_v4(),
  "cartId" text,
  "productId" uuid,
  count integer,
  "orderId" text,
  foreign key ("cartId") references "Cart" ("id")
  foreign key ("orderId") references "Order" ("id")
);
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItems_Carts_ForeignKey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

INSERT INTO "CartItem" ("cartId", "productId", count) VALUES 
('8b405eca-c072-4fe3-a0b7-af575f38cdb3', '8b405eca-c072-4fe3-a0b7-af575f38cdb5', 1)