import { createUser, getUserByAddress } from "../db/users";
import { createNonce, getNonceByNonce } from "../db/nonces";
import express from "express";
import { generateNonce, SiweMessage, SiweErrorType } from "siwe";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const ethValidate = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (req.query.address) {
      const address = req.query.address.toString();
      const nonce = req.query.nonce.toString();
      if (!address) {
        return res.sendStatus(403);
      }
      const nonceObj = await getNonceByNonce(nonce);
      if (nonceObj && address == nonceObj.address) {
        return res.status(200).json({ address: address }).end();
      }
    }
    return res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

function addMinutes(date: Date, minutes: number) {
  date.setMinutes(date.getMinutes() + minutes);

  return date;
}

export const ethNonce = async (req: express.Request, res: express.Response) => {
  try {
    const nonce = generateNonce();
    const nonceObj = await getNonceByNonce(nonce);

    if (nonceObj) {
      return res.sendStatus(400);
    }

    const currentDate = new Date();
    const nonceObj1 = await createNonce({
      nonce: nonce,
      address: "",
    });

    return res.status(200).json({ nonce }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const ethVerify = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    if (!req.body.message) {
      res
        .status(422)
        .json({ message: "Expected prepareMessage object as body." });
      return;
    }

    let message = new SiweMessage(req.body.message);
    const nonceObj = await getNonceByNonce(message.nonce);

    const fields = await message.validate(req.body.signature);
    if (fields.nonce !== nonceObj.nonce) {
      res.status(422).send({
        message: `Invalid nonce.`,
      });
      return;
    }
    if (nonceObj.address != "") {
      return res.sendStatus(400);
    }
    nonceObj.address = fields.address;
    nonceObj.save();

    let userId = "";
    let user = await getUserByAddress(fields.address);
    if (!user) {
      user = await createUser({
        address: fields.address,
      });
      userId = user._id.toString();
    }

    // ** Create JWT Token
    const token = jwt.sign(
      { _id: user._id, address: user.address },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    return res
      .status(200)
      .json({
        data: { token, userId: user._id },
        message: "Verify",
      })
      .end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
