Create Table "User" (
    id uuid primary key default uuid_generate_v4(),
    name text NOT NULL,
    password text NOT NULL,
    email text
);

Alter Table "Cart" ADD Constraint "Cart_userId_foreignKey" Foreign Key ("userId") References "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO "User" (id, name, password, email) VALUES 
('3f150694-de43-4ecf-afc8-9929af1e1fea', 'User 1', 'user@email.com')