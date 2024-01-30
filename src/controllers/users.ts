import express from "express";

import { getUsers, getUserById } from "../db/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const { phone } = req.body;

    if (!email) {
      return res.sendStatus(400);
    }
    if (!phone) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    user.email = email;
    user.phone = phone;
    await user.save();

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const postUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.body;
    const { email } = req.body;
    const { phone } = req.body;

    if (!email) {
      return res.sendStatus(400);
    }
    if (!phone) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    user.email = email;
    user.phone = phone;
    await user.save();

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
