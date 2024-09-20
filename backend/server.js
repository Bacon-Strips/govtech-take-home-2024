import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config({path: "../.env"});

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/api/auth', authRoutes);

const PORT = process.env.BACKEND_PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
