import { ConnectionOptions } from 'typeorm';
// import { User } from './entities/userEntity';
// import { Twit } from './entities/twitEntity';
// import { Comment } from './entities/commentEntity';
// import { Like } from './entities/likeEntity';
import dotenv from 'dotenv';

dotenv.config();

const pgconfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: +(process.env.PG_PORT as string),
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  // entities: [User, Twit, Comment, Like],
  entities: [`${__dirname}/entities/*.js`],
  migrations: ['migration/*.js'],
  cli: { migrationsDir: 'migration' },
  // ssl: { rejectUnauthorized: false },
  // syncronize: true, 'src/entity/*.ts', './build/src/entity/*.js'
};

export = pgconfig;
