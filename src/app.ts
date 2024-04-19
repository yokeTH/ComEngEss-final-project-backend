import PostRoute from './routes/postRoute';
import UserRoute from './routes/userRoute';
import cors from 'cors';
import express from 'express';
import logMiddleware from './middlewares/logMiddleware';
import { errorMiddleware } from './middlewares/errorMiddleware';

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
