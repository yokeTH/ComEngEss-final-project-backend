import express, { Request, Response } from 'express';
import logMiddleware from './middlewares/logMiddleware';

const app = express();

app.use(logMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req: Request, res: Response) => {
  res.json({ status: new Date(Date.now()).toTimeString() });
});

export default app;
