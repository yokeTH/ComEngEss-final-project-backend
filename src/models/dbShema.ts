import { mongo } from "mongoose";

const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  topic: { type: Schema.Types.ObjectId, ref: 'Topic' },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  photoKey: String,
  photoUrl: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const topicSchema = new Schema({
  name: { type: String, unique: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const tagSchema = new Schema({
  name: { type: String ,unique:false},
  score: Number,
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const User = mongoose.model('User', userSchema);
export const Post = mongoose.model('Post', postSchema);
export const Topic = mongoose.model('Topic', topicSchema);
export const Tag = mongoose.model('Tag', tagSchema);



