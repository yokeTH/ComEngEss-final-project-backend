import { SuccessResponseDto } from "../dtos/response.js";
import { HttpClientError } from "../enums/http.js";
import HttpException from "../exceptions/httpException.js";
import { Tag, Topic } from "../models/dbShema.js";
import { authorize } from "../utils/authorizer.js";

export const getTags = async(req, res,next)=>{
    try{
        const { authorization } = req.headers;
        if (!authorization) throw new HttpException('require authorization', HttpClientError.BadRequest);
        await authorize(authorization);
        const tags = await Tag.find({}).populate('post').exec();
        console.log(tags)
        const tagsNameDup = tags.map((tag)=>tag.toObject().name);
        console.log(tagsNameDup)
        const tagsName = [...new Set(tagsNameDup)];
        res.json(new SuccessResponseDto(tagsName));
    }catch(e){
        console.log(e)
        next(e)
    }
}

export const getTopics = async(req, res,next)=>{
    try{
        const { authorization } = req.headers;
        if (!authorization) throw new HttpException('require authorization', HttpClientError.BadRequest);
        await authorize(authorization);
        const topics = await Topic.find({});
        console.log(topics)
        const topicsName = topics.map((topic)=>topic.toObject().name);
        res.json(new SuccessResponseDto(topicsName));
    }catch(e){
        console.log(e)
        next(e)
    }
}