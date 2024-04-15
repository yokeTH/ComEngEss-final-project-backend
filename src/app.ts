import express from 'express';
import PostRoute from './routes/postRoute';
import UserRoute from './routes/userRoute';
import cors from 'cors';

const app = express();

//body-praser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(cors());

// use routes
app.use('/post', PostRoute);
app.use('/user', UserRoute);

export default app;
