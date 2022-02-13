import { Request, Response } from "express";
import { User } from "../entities/userEntity";
import { getConnection } from "typeorm";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { ...req.body },
      ])
      .returning("*")
      .execute();

    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: "error",
    });
  }
};
