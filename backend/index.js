import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';
import assetsRouter from './routes/assets.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/assets', assetsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Asset Tracker API is running!' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// Testing the db connection (PostgreSQL)
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err)
  } else {
    console.log('Database connection successful:', res.rows[0])
  }
})