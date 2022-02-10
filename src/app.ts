import createError, { HttpError } from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import { createConnection, getConnection } from "typeorm";
import { User } from "./entities/userEntity";
import pgconfig from "./pgconfig";
import twitRouter from './routes/twit'

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

// // create typeorm connection
// createConnection().then(connection => {
//   const userRepository = connection.getRepository('');
// })
dotenv.config();

createConnection(pgconfig)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("err", err);
  });


console.log(process.env.EMAIL_PORT)

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/twit", twitRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
