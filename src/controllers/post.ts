import { Post, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

export const getPosts = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    include: { tags: true, topic: true },
  });
  res.status(200).json(posts);
  console.log(posts);
};

export const getPostsById = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      where: { id: req.params.id },
    });
    res.status(200).json(posts);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export const getPostsByTag = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    where: {
      tags: {
        some: {
          tag: {
            name: req.params.name,
          },
        },
      },
    },
  });
  res.status(200).json(posts);
};

export const getPostsByTopic = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    where: { topic: { name: req.params.name } },
    include: { tags: true, topic: true },
  });
  res.status(200).json(posts);
};

export const createPost = async (req: Request, res: Response) => {
  const { userId, topicName, tags, photoUrl, description } = req.body;
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
        create: tags.map((tag: { name: unknown; score: unknown }) => ({
          tag: {
            connectOrCreate: {
              where: { name: tag.name },
              create: { name: tag.name, score: tag.score },
            },
          },
        })),
      },
    },
  });
  res.status(200).json(post);
};
