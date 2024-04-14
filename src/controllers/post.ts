import { Post, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

export const getPosts = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  res.status(200).json(posts);
};

export const getPostsById = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    where: { id: req.params.id },
  });
  res.status(200).json(posts);
};

export const getPostsByTag = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    where: { tags: { name: req.params.name } },
  });
  res.status(200).json(posts);
};

export const getPostsByTopic = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    where: { topic: { name: req.params.name } },
  });
  res.status(200).json(posts);
};

export const createPost = async (req: Request, res: Response) => {
  const { userId, topicName, tagName, photoUrl, description, tagScore } = req.body;
  const post = await prisma.post.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      photoUrl: photoUrl,
      description: description,
      topic: {
        connectOrCreate: {
          create: {
            name: topicName,
          },
          where: {
            name: topicName,
          },
        },
      },
      tags: {
        connectOrCreate: {
          create: {
            name: tagName,
            score: tagScore,
          },
          where: {
            name: tagName,
          },
        },
      },
    },
  });
};
