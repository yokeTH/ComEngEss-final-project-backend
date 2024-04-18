import { NextFunction, Request, Response } from 'express';
import { uploadFile, getUrl } from '@/services/storage';
import { PrismaClient } from '@prisma/client';
import { SuccessResponseDto } from '@/dtos/response';
import HttpException from '@/exceptions/httpException';
import { HttpClientError, HttpServerError, HttpSuccess } from '@/enums/http';
import { authorize } from '@/utils/authorizer';
import { createPostCheck, parseIntPlus } from '@/utils/zodChecker';
import { ZodError } from 'zod';
import { create } from 'domain';

const prisma = new PrismaClient();

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new HttpException('require authorization', HttpClientError.Unauthorized);
    await authorize(authorization);
    const posts = await prisma.post.findMany({
      include: { tags: { include: { tag: true } }, topic: true },
    });
    const updated = await Promise.all(posts.map(async (post) => ({ ...post, photoUrl: await getUrl(post.photoKey) })));
    res.json(new SuccessResponseDto(updated));
  } catch (e: unknown) {
    next(e);
  }
};

export const getPostsById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new HttpException('require authorization', HttpClientError.Unauthorized);
    await authorize(authorization);
    const id = req.params.id;
    const posts = await prisma.post.findMany({
      where: { id: id },
      include: { tags: { include: { tag: true } }, topic: true },
    });
    const updated = await Promise.all(posts.map(async (post) => ({ ...post, photoUrl: await getUrl(post.photoKey) })));
    res.json(new SuccessResponseDto(updated));
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
    const { authorization } = req.headers;
    if (!authorization) throw new HttpException('require authorization', HttpClientError.Unauthorized);
    await authorize(authorization);
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
      include: { tags: { include: { tag: true } }, topic: true },
    });
    const updated = await Promise.all(posts.map(async (post) => ({ ...post, photoUrl: await getUrl(post.photoKey) })));
    res.json(new SuccessResponseDto(updated));
  } catch (e: unknown) {
    next(e);
  }
};

export const getPostsByTopic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new HttpException('require authorization', HttpClientError.Unauthorized);
    await authorize(authorization);
    const posts = await prisma.post.findMany({
      where: { topic: { name: req.params.name } },
      include: { tags: { include: { tag: true } }, topic: true },
    });
    const updated = await Promise.all(posts.map(async (post) => ({ ...post, photoUrl: await getUrl(post.photoKey) })));
    res.json(new SuccessResponseDto(updated));
  } catch (e: unknown) {
    next(e);
  }
};

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { topicName, tags, description } = req.body;
    const { authorization } = req.headers;
    if (!authorization) throw new HttpException('require authorization', HttpClientError.Unauthorized);
    const userId = await authorize(authorization!);
    createPostCheck(topicName, tags, description, req.file?.mimetype);
    const post = await prisma.post.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        photoKey: '',
        photoUrl: '',
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
              create: {
                name: tag.name,
                score: parseIntPlus(tag.score),
              },
            },
          })),
        },
      },
    });
    const key = userId + '_' + post.id;
    await uploadFile(req.file?.buffer!, key, req.file?.mimetype!);
    const updatedPost = await prisma.post.update({
      where: {
        id: post.id,
      },
      data: {
        photoKey: key,
      },
      include: { tags: { include: { tag: true } }, topic: true },
    });
    res.json(new SuccessResponseDto(updatedPost, HttpSuccess.Created));
  } catch (e: unknown) {
    next(e);
  }
};
