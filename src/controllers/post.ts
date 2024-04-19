import { NextFunction, Request, Response } from 'express';
import { uploadFile, getUrl } from '@/services/storage';
import { PrismaClient } from '@prisma/client';
import { SuccessResponseDto } from '@/dtos/response';
import HttpException from '@/exceptions/httpException';
import { HttpClientError, HttpSuccess } from '@/enums/http';
import { authorize } from '@/utils/authorizer';
import { createPostCheck, parseIntPlus } from '@/utils/zodChecker';
import { ZodError } from 'zod';

import { User, Post, Topic, Tag } from '@/models/dbShema';

const prisma = new PrismaClient();

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new HttpException('require authorization', HttpClientError.Unauthorized);
    await authorize(authorization);
    // Assuming authorize(authorization) is a function that you've defined elsewhere
    // await authorize(authorization);

    // Fetch posts using Mongoose
    const posts = await Post.find({}).populate('tags').populate('topic').exec();

    // Map through posts to add photoUrl
    // const updated = await Promise.all(posts.map(async (post:any) => {
    //   const photoUrl = await getUrl(post.photoKey); // Assuming getUrl is a function to get the URL based on photoKey
    //   ; // Convert to object to avoid modifying Mongoose document directly
    

    res.json(posts); // Assuming SuccessResponseDto is not needed and you want to send the posts directly
  } catch (e: unknown) {
    console.log(e)
    next(e);
  }
};

export const getPostsById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new HttpException('require authorization', HttpClientError.Unauthorized);
    // await authorize(authorization);
    const id =req.params.id;
    const posts = await Post.findById(
       id
    ).populate('tags').populate('topic').exec();
    // const updated = await Promise.all(posts.map(async (post) => ({ ...post, photoUrl: await getUrl(post.photoKey) })));
    res.json(new SuccessResponseDto(posts));
  } catch (e: unknown) {
    if (e instanceof ZodError) {
      next(new HttpException(e.message, HttpClientError.BadRequest));
    } else {
      next(e);
    }
  }
};

export const getPostsByTag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const { authorization } = req.headers;
    // if (!authorization) throw new HttpException('require authorization', HttpClientError.Unauthorized);
    // await authorize(authorization);
    // const posts = await prisma.post.findMany({
    //   where: {
    //     tags: {
    //       some: {
    //         tag: {
    //           name: req.params.name,
    //         },
    //       },
    //     },
    //   },
    //   include: { tags: { include: { tag: true } }, topic: true },
    // });
    // const updated = await Promise.all(posts.map(async (post) => ({ ...post, photoUrl: await getUrl(post.photoKey) })));
    const { name } = req.params;
    const tags = await Tag.find({ name: name }).exec();

    // Extract tag IDs
    const tagIds = tags.map((tag: { _id: any; }) => tag._id);

    // Find posts that have any of the found tag IDs
    const posts = await Post.find({ tags: { $in: tagIds } })

    res.json(new SuccessResponseDto(posts));
  } catch (e: unknown) {
    next(e);
  }
};

export const getPostsByTopic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {name} = req.params
    console.log(name);
    //const { authorization } = req.headers;
    //if (!authorization) throw new HttpException('require authorization', HttpClientError.Unauthorized);
    //await authorize(authorization);
    const topic = await Topic.findOne({name})
    const posts = await Post.find({
      topic: topic._id
    }).populate('tags').populate('topic').exec();;
    //const updated = await Promise.all(posts.map(async (post) => ({ ...post, photoUrl: await getUrl(post.photoKey) })));
    res.json(new SuccessResponseDto(posts));
  } catch (e: unknown) {
    next(e);
  }
};

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { topicName, tags, description } = req.body;
//     const { authorization } = req.headers;
    
//     createPostCheck(topicName, tags, description, req.file?.mimetype);
//     const post = await prisma.post.create({
//       data: {
//         user: {
//           connect: {
//             id: userId,
//           },
//         },
//         photoKey: '',
//         photoUrl: '',
//         description: description,
//         topic: {
//           connectOrCreate: {
//             create: {
//               name: topicName,
//             },
//             where: {
//               name: topicName,
//             },
//           },
//         },
//         tags: {
//           create: tags.map((tag: { name: string; score: string }) => ({
//             tag: {
//               create: {
//                 name: tag.name,
//                 score: parseIntPlus(tag.score),
//               },
//             },
//           })),
//         },
//       },
//     });
//     const key = userId + '_' + post.id;
//     await uploadFile(req.file?.buffer!, key, req.file?.mimetype!);
//     const updatedPost = await prisma.post.update({
//       where: {
//         id: post.id,
//       },
//       data: {
//         photoKey: key,
//       },
//       include: { tags: { include: { tag: true } }, topic: true },
//     });
//     res.json(new SuccessResponseDto(updatedPost, HttpSuccess.Created));
//   } catch (e: unknown) {
//     next(e);
//   }
// };
try {
  const { topicName, tags, description, userId } = req.body;
  const { authorization } = req.headers;
  if (!authorization) throw new HttpException('require authorization', HttpClientError.Unauthorized);
  const uuserId = await authorize(authorization!);
  // Assuming authorize(authorization) is a function that you've defined elsewhere
  // console.log(authorization)
  // const userId = await authorize(authorization!);
  // console.log(userId)
  //Assuming uploadFile is a function to upload files
  
  // Find or create topic
  const topic = await Topic.findOneAndUpdate(
    { name: topicName },{ name: topicName },
    { upsert: true, new: true }
  );
  console.log(topic)
  // Create tags
  const createdTags = await Promise.all(
    tags.map(async (tag: { name: string; score: string }) => {
      const createdTag = await Tag.create({ name: tag.name, score: parseIntPlus(tag.score) });
      return createdTag;
    })
  );
  
  // Create post
  const post:typeof Post = await Post.create({
    user: userId,
    photoKey: '',
    photoUrl: '', // Assuming it's populated later
    description: description,
    topic: topic._id,
    tags: createdTags,
  });

  // Populate post with topic and tags
  const populatedPost = await Post.findById(post._id).populate('topic').populate('tags').exec();

  res.json(populatedPost); // Assuming you want to send the created post directly in the response
} catch (e: unknown) {
  console.log(e)
  next(e);
}
};
