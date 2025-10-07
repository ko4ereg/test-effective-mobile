import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import authRoutes from './controllers/auth.controller';
import userRoutes from './controllers/user.controller';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 })); // простая защита

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.get('/health', (req, res) => res.json({ ok: true }));

app.use(errorHandler);

export default app;
