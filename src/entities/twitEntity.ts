import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./userEntity";


@Entity()
export class Twit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  twit: string;

  @ManyToOne(() => User, (user) => user.id)
  user_id: number;


  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public created_at: Date;
}
