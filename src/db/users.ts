import mongoose from "mongoose";

// User Config
const UserSchema = new mongoose.Schema({
  address: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  expiredDate: { type: Date, select: false },
});

export const UserModel = mongoose.model("User", UserSchema);

// User Actions
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserByAddress = (address: string) =>
  UserModel.findOne({ address });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user);
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
