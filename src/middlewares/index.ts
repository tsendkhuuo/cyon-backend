import express from "express";
import { merge, get } from "lodash";
const jwt = require("jsonwebtoken");
import dotenv from "dotenv";
dotenv.config();

// import { getUserBySessionToken } from "../db/users";

export const authenticateJWT = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.params.userId = user._id;

      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id, userId } = req.params;
    if (!userId) {
      return res.sendStatus(400);
    }

    if (userId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
