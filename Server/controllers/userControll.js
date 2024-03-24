import UserModel from "../models/userModel.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import appError from "../utils/appError.js";
import httpStatusText from "../utils/httpStatusText.js";

export const getusers = asyncWrapper(async (req, res, next) => {
  const users = await UserModel.find();
  if(!users){
    return next(new appError("Users Not Found", 401, httpStatusText.FAIL));
  }
  res.status(200).json({
    state: httpStatusText.SUCCESS,
    users,
  });
});

export const getOneUser = asyncWrapper(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    return next(new appError("User Not Found", 404, httpStatusText.FAIL));
  }
  res.status(200).json({
    state: httpStatusText.SUCCESS,
    data: {
      user,
    },
  });
});

export const deleteMe = asyncWrapper(async (req, res, next) => {
  const { currentPassword } = req.body; 
  if (!currentPassword) {
    return res.status(401).json({
      message: "Passwprd Required",
    });
  }
  const user = await UserModel.findById(req.user._id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  const isPasswordValid = await user.correctPassword(currentPassword, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Incorrect Current Password",
    });
  }
  await UserModel.deleteOne({ _id: req.user._id });
  res.status(200).json({
    state: httpStatusText.SUCCESS,
    data: null,
    message: "User deleted successfully",
  });
});

export const updateProfile = asyncWrapper(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
  };
  //cloudinary
  const user = await UserModel.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Your profile has been updated successfully!",
  });
});
