import PostRoute from './routes/postRoute.js';
import UserRoute from './routes/userRoute.js';
import cors from 'cors';
import express from 'express';
import logMiddleware from './middlewares/logMiddleware.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import './config/db.js';

//body-praser

const app = express();

app.use(logMiddleware);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(cors());

// use routes
app.use('/posts', PostRoute);
app.use('/user', UserRoute);
app.use(errorMiddleware);
export default app;
