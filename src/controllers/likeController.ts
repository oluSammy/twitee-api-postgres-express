import { Request, Response } from "express";
import { Like } from "../entities/likeEntity";
import { getConnection, getRepository } from "typeorm";

export const likeTwit = async (req: Request, res: Response) => {
  try {
    const user = req.user.id;
    
    const isLiked = await getRepository(Like)
    .createQueryBuilder("like")
    .where("like.twit = :twit AND like.user_id = :user_id", {twit: req.params.id, user_id: user  })
    .getOne();

    if(isLiked){
     return res.status(401).json({message: "You have already liked this tweet"})
    }
    
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

    const data = like.raw;
    res.status(201).json({
      status: "success",
      message: "Twit liked!",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
    });
  }
};

export const getLikes = async (req: Request, res: Response) => {
  try {
    const likes = await getRepository(Like)
      .createQueryBuilder("like")
      .where("like.twitId = :twitId", {twitId: req.params.id })
      .getMany();
    

    res.status(201).json({
      status: "success",
      message: "All Twit's likes!",
      likes,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
    });
  }
};


export const deleteLikesRow = async (req: Request, res: Response) => {
  try {
   
    const user = req.user.id;
    const data = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Like)
      .where("id > 10")
      .execute();


    res.status(201).json({
      status: "success",
      message: "likes deleted!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
    });
  }
};


