import mongoose from "mongoose";

// Nonces Config
const NonceSchema = new mongoose.Schema({
  address: { type: String, required: false },
  nonce: { type: String, required: true },
});

export const NonceModel = mongoose.model("Nonce", NonceSchema);

// User Actions
export const getNonceByNonce = (nonce: string) => NonceModel.findOne({ nonce });

export const createNonce = (values: Record<string, any>) =>
  new NonceModel(values).save().then((nonce) => nonce.toObject());
export const updateUserByNonce = (id: string, values: Record<string, any>) =>
  NonceModel.findByIdAndUpdate(id, values);
