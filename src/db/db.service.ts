import { Client } from 'pg';
require('dotenv').config();
const { PG_HOST, PG_PORT, PG_DB, PG_USER, PG_PASSWORD } = process.env;

export default async () => {

  const client = new Client({
    host: PG_HOST,
    port: PG_PORT,
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_DB,
    connectionTimeoutMillis: 5000,
    ssl: false,
  });

  await client.connect();
  const res = await client.query('SELECT $1::text as connected', [
    'Connection to postgres successful!',
  ]);
  console.log(res.rows[0].connected);
  return client;

}