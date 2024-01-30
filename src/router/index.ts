import express from "express";

import ethAuthentication from "./ethAuthentication";
import users from "./users";

const router = express.Router();

export default (): express.Router => {
  users(router);
  ethAuthentication(router);

  return router;
};
