import { ConnectionOptions } from "typeorm"
import { User } from "./entities/userEntity"
import { Twit } from "./entities/twitEntity"
import { Comment } from "./entities/commentEntity"
import { Like } from "./entities/likeEntity"


 const pgconfig: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "decagon",
  password: "",
  database: "twitee",
  entities: [User, Twit, Comment, Like],
  migrations: ["migration/*.js"],
  cli: { migrationsDir: "migration" },
  // syncronize: true,
}



export = pgconfig
