import express from "express";

import {
  getAllUsers,
  updateUser,
  getUser,
  postUser,
} from "../controllers/users";
import { authenticateJWT, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/api/users", authenticateJWT, getAllUsers);
  router.get("/api/users/:id", authenticateJWT, isOwner, getUser);
  router.post("/api/users/:id", authenticateJWT, isOwner, postUser);
  // router.patch("/api/users/:id", authenticateJWT, isOwner, updateUser);
};
