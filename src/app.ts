import express from 'express';
import { getPosts, getPostsById, getPostsByTag, getPostsByTopic, createPost } from './controllers/post';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.get('/', (req: Request, res: Response) => {
//   res.json({ status: new Date(Date.now()).toTimeString() });
// });
app.get('/', getPosts);
app.get('/:id', getPostsById);
app.get('/tag/:name', getPostsByTag);
app.get('/topic/:name', getPostsByTopic);
app.post('/', createPost);

export default app;
