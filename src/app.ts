import express from 'express';
import PostRoute from './routes/postRoute';
import cors from 'cors';

const app = express();

//body-praser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(cors());

// use routes
app.use('/posts', PostRoute);

export default app;
