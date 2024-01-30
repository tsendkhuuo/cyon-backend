import express from "express";

import {
  ethNonce,
  ethVerify,
  ethValidate,
} from "../controllers/ethAuthentication";

export default (router: express.Router) => {
  router.get(`/api/nonce`, ethNonce);
  router.post(`/api/verify`, ethVerify);
  router.get(`/api/validate`, ethValidate);
};
