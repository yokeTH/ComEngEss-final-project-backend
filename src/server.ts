import app from '@/app';
import mongoose from 'mongoose';
mongoose.connect(process.env.DATABASE_URL as string);
app.listen(3001);
