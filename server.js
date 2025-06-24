import dotenv from 'dotenv';
import express from 'express';
import connectDB from './database/mongodb.js';
import accountRoutes from './routes/accountRoutes.js';

// Connect to MongoDB
connectDB();

// setup environment
const env = process.env.NODE_ENV || 'develop';
dotenv.config({ path: `.env.${env}` });
console.log(`[SERVER] Now using ${env} environment!`);

// express app
const app = express();
app.use(express.json()); // รองรับ json body
app.use('/api/account', accountRoutes);

app.listen(9095, () => {
    console.log(`[SERVER] Server running on http://localhost:${process.env.PORT}`)
})