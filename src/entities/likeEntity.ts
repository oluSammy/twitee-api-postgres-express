import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Unique,
    ManyToOne,
  } from "typeorm";
  import { User } from "./userEntity";
  import { Twit } from "./twitEntity";
  
  @Entity()
  @Unique(["twit", "user_id"])
  export class Like {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Twit, (twit) => twit.id)
    twit: number;
  
  
    @ManyToOne(() => User, (user) => user.id)
    user_id: number;
  
    @CreateDateColumn({
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP(6)",
    })
    public created_at: Date;
  }
  