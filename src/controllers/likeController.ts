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
      .getCount();
    // .getMany();
    // .where("like.twitId = :twitId", {twitId: req.params.id })

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
