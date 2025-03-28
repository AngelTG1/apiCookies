import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js'
import questionRoutes from './routes/questionRoutes.js'
import userAnswerRoutes from './routes/userAnswerRoutes.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/user-answer', userAnswerRoutes)

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
