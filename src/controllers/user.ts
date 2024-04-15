import { Post, PrismaClient, User } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {Secret} from "jsonwebtoken";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) =>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const user = await prisma.user.create({
            data:{
                username:req.body.username,
                password:hashedPassword,
                email:req.body.email,
            }
        })
        res.status(200).json(user);
    }catch(e:any){
        res.status(500).json({message:e.name});
    }
}

export const login = async (req: Request, res: Response) =>{
    try{
        const user = await prisma.user.findFirst({
            where:{username:req.body.username}
        });
        if (!user) {
            // If no user found, return appropriate response
            return res.json({ message: "User not found" });
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        const accessToken = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET as Secret)
        if(match){
            res.json({ accessToken: accessToken });
        } else {
            res.json({ message: "Invalid Credentials" });
        }
    }catch(e){
        console.log(e)
    }
}
