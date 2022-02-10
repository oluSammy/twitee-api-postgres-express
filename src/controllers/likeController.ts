import {Request, Response} from 'express';
import { Like } from '../entities/likeEntity';
import { getConnection, getRepository } from 'typeorm';

export const likeTwit = async (req: Request, res: Response) => {
    try{
      const user = req.user.id
      
    
        const like = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Like)
        .values([
          {
            twit: +req.params.id,
            user_id: user,

          },
        ])
        .returning("*")
        .execute();
        const data = like.raw
      res.status(201).json({
        status: "success",
        message: "Twit liked!",
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


export const getLikes = async (req: Request, res: Response) => {
    try{
      const comments = await getRepository(Like)
      .createQueryBuilder("like")
      .where("like.twit = :twit", {twit: req.params.id })
      .getMany();
    
      res.status(201).json({
        status: "success",
        message: "All Twit's likes!",
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
