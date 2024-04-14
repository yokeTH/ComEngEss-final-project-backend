import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.json({ status: new Date(Date.now()).toTimeString() });
});

export default app;
