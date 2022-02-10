import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../entities/userEntity";
import { getConnection, getRepository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import sendEmail from "../utils/email";

const generateToken = (userId: number, email: string) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  };

export const signup =async (req: Request, res: Response, next: NextFunction) => {
    try{

    const password = await bcrypt.hash(req.body.password, 12);
    const email = req.body.email
    const name= email.substring(0, email.lastIndexOf("@"));

    const user = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
            name: name,
            email: req.body.email,
            password: password
        } ,
      ])
      .returning("*")
      .execute();

      console.log(user, '***')
    const token = generateToken(user.raw[0].id, user.raw[0].email);
    const data = user.raw
    res.status(201).json({
        status: "success",
        data: {data, token}
      });
     
      sendEmail(user.raw[0].email,
        'Email Verification',
        `<p>Hello ${user.raw[0].name},</p><p>Thank you for signing up for a Twitter account.
         Welcome onboard!!!,</p>`)
         .then(() => {
          console.log('email sent');
        })
        .catch((err) => {
          console.log(err);
        }); 
    }
    catch(err){
        console.log(err);
        res.status(500).json({
          status: "error",
        });  
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try{
    
    const data = await getRepository(User)
    .createQueryBuilder("user")
    .where("user.email = :email", { email: req.body.email  })
    .getOne();
    //console.log(data, '***')
    if(!data){
      return res.status(400).json({
          message: "invalid login credentials",
        });
    }
    const match = await bcrypt.compare(
      req.body.password,
      data.password
    );

    if (!match) {
      return res.status(400).json({
        message: "invalid login credentials",
      });
    }

    const token = generateToken(data.id, data.email);

    res.status(201).json({
      status: "success",
      message: "login successful",
      data: { token },
    });
  }
  catch(err){
    console.log(err);
        res.status(500).json({
          status: "error",
        }); 
  }
  
}

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({message:'You are not authorized! 🚨'});
  }

  const decodedToken: any = jwt.verify(token as string, process.env.JWT_SECRET_KEY as string);
  const data = await getRepository(User)
    .createQueryBuilder("user")
    .where("user.email = :email", { email: decodedToken.email })
    .getOne();
  req.user = data;

  next();
};