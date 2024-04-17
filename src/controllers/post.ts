
import { NextFunction, Request, Response } from 'express';
import { uploadFile,getUrl } from '@/services/storage';
// import HttpException from '@/exceptions/httpException';
// import { HttpClientError } from '@/enums/http';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getPosts = async (req: Request, res: Response) => {
  const updatedPost = await prisma.post.updateMany({
    data:{
      photoUrl:"1"
    }
  })
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

export const createPost = async (req: Request, res: Response, next:NextFunction) => {
  // new HttpException("bad",HttpClientError.BadRequest)
  // console.log(req.file);
  // await uploadFile(req.file?.buffer!,"abc",req.file?.mimetype!)
  // const url = await getUrl("abc");
  // console.log(url);

  const { userId, topicName, tags , description } = req.body;
  const post = await prisma.post.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      photoKey:"",
      photoUrl: "",
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
        create: tags.map((tag: { name: string; score: string }) => ({
          tag: {
            connectOrCreate: {
              where: { name: tag.name },
              create: { name: tag.name, score: parseInt(tag.score) },
            },
          },
        })),
      },
    },
  });
  const key = userId+'_'+post.id;
  await uploadFile(req.file?.buffer!,key,req.file?.mimetype!)
  const updatedPost = await prisma.post.update({
    where:{
      id:post.id
    },
    data:{
      photoKey:key
    }
  })
  res.status(200).json(post);
};
