Create table "Order" (
    id uuid primary key default uuid_generate_v4(),
    "userId" text NOT NULL,
    "cartId" text NOT NULL,
    items JSONB NOT NULL,
    payment JSONB,
    delivery JSONB,
    comments text,
    status text NOT NULL,
    createdAt date NOT NULL,
    updatedAt date NOT NULL
    total integer NOT NULL,
   
    CONSTRAINT "Order_primaryKey" PRIMARY KEY ("id")
);