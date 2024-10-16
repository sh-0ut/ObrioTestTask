require('dotenv').config();

const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
    return client.query(`CREATE DATABASE ${process.env.DB_NEW_NAME}`);
  })
  .then(() => {
    console.log(`Database ${process.env.DB_NAME} created successfully!`);
  })
  .catch(err => {
    console.error('Error creating database:', err);
  })
  .finally(() => {
    client.end();
  });
