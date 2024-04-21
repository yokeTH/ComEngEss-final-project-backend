import getUrl from '../services/r2_storage/getUrl.js';
import uploadFile from '../services/r2_storage/upload.js';
import { SuccessResponseDto } from '../dtos/response.js';
import HttpException from '../exceptions/httpException.js';
import { HttpClientError, HttpSuccess } from '../enums/http.js';
import { authorize } from '../utils/authorizer.js';
import { parseIntPlus } from '../utils/zodChecker.js';
import { User, Post, Topic, Tag } from '../models/dbShema.js';
import { extractDataAndMimeType, updatePhotoUrls } from '../utils/image.js';

export const getPosts = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new HttpException('require authorization', HttpClientError.BadRequest);
    await authorize(authorization);
    const posts = await Post.find({}).populate('tags').populate('user').populate('topic').exec();
    const updated = await updatePhotoUrls(posts);
    res.json(new SuccessResponseDto(updated));
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const getPostsById = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new HttpException('require authorization', HttpClientError.Unauthorized);
    await authorize(authorization);
    const id = req.params.id;
    console.log(id);
    const post = await Post.findById(id).populate('tags').populate('topic').populate('user').exec();
    if (post) {
      post.photoUrl = await getUrl(post.photoKey);
    }
    post.user.password = undefined;
    res.json(new SuccessResponseDto(post));
  } catch (e) {
    next(e);
  }
};

export const getPostsByTag = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new HttpException('require authorization', HttpClientError.Unauthorized);
    await authorize(authorization);
    const { name } = req.params;
    const tags = await Tag.find({ name: name }).exec();
    // Extract tag IDs
    const tagIds = tags.map((tag) => tag._id);

    // Find posts that have any of the found tag IDs
    const posts = await Post.find({ tags: { $in: tagIds } })
      .populate('user')
      .populate('topic')
      .populate('tags');

    const updated = await updatePhotoUrls(posts);
    res.json(new SuccessResponseDto(updated));
  } catch (e) {
    next(e);
  }
};

export const getPostsByTopic = async (req, res, next) => {
  try {
    const { name } = req.params;
    const { authorization } = req.headers;
    if (!authorization) throw new HttpException('require authorization', HttpClientError.BadRequest);
    await authorize(authorization);
    const topic = await Topic.findOne({ name });
    const posts = await Post.find({
      topic: topic._id,
    })
      .populate('tags')
      .populate('topic')
      .populate('user')
      .exec();
    const updated = await updatePhotoUrls(posts);
    res.json(new SuccessResponseDto(updated));
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { topicName, tags, description, image } = req.body;
    const { authorization } = req.headers;
    if (!authorization) throw new HttpException('require authorization', HttpClientError.Unauthorized);
    if (!topicName) throw new HttpException('require topic name', HttpClientError.BadRequest);
    if (!description) throw new HttpException('require description', HttpClientError.BadRequest);
    if (!tags) throw new HttpException('require tags', HttpClientError.BadRequest);
    if (!image) throw new HttpException('require image', HttpClientError.BadRequest);
    const { userId } = await authorize(authorization);

    // Create post
    const post = await Post.create({
      user: userId,
      photoKey: '',
      photoUrl: '',
      description: description,
    });
    // Create tags

    const modifiedTag = tags.map((tag) => ({
      ...tag,
      post: post._id,
      score: parseIntPlus(tag.score),
    }));
    console.log(modifiedTag);
    const createdTags = await Tag.create(modifiedTag);

    // Create topic
    const topic = await Topic.findOneAndUpdate({ name: topicName }, { name: topicName }, { upsert: true, new: true });

    topic.posts.push(post._id);
    await topic.save();

    const key = userId + '_' + post.id;
    const imageVariant = extractDataAndMimeType(image);
    await uploadFile(Buffer.from(imageVariant[0], 'base64'), key, imageVariant[1]);
    //Update user
    const user = await User.findById(userId);
    user.posts.push(post);
    await user.save();
    //Asign each field to post
    post.photoKey = key;
    post.tags = createdTags;
    post.topic = topic._id;
    await post.save();
    const populatedPost = await Post.findById(post._id).populate('tags').populate('user').populate('topic');
    populatedPost.photoUrl = await getUrl(populatedPost.photoKey);
    populatedPost.user.password = undefined;
    res.json(new SuccessResponseDto(populatedPost, HttpSuccess.Created)); // Assuming you want to send the created post directly in the response
  } catch (e) {
    console.log(e);
    next(e);
  }
};
