import {Request, Response} from 'express';
import { Twit } from '../entities/twitEntity'; 
import { getConnection, getRepository } from 'typeorm';
import { Comment } from '../entities/commentEntity';

export const createComment = async (req: Request, res: Response) => {
    try{
      const user = req.user.id
    //   console.log(req.user)
    
        const comment = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Comment)
        .values([
          {
            comment: req.body.comment,
            user_id: user,
            twit: +req.params.id

          },
        ])
        .returning("*")
        .execute();
        const data = comment.raw
      res.status(201).json({
        status: "success",
        message: "comment created",
        data
      });
    }
    catch(err){
        console.log(err);
    res.status(500).json({
      status: "error",
    });
    }
}

export const getComments = async (req: Request, res: Response) => {
    try{
      const comments = await getRepository(Comment)
      .createQueryBuilder("comment")
      .where("comment.twit = :twit", {twit: req.params.id })
      .getMany();
    
      res.status(201).json({
        status: "success",
        message: "All Twit's comment!",
        comments
      });
  
    }
    catch(err){
      console.log(err);
      res.status(500).json({
      status: "error",
      });
    }
  }