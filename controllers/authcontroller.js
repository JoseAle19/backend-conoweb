// modulo para encriptar password
import bcrypt from "bcryptjs";
import { uploadimage } from "../helpers/uploadimage.js";

import User from "../models/User.js";
// Hacer instancia de el modelo de usuarios
const UserModel = new User();

export const login = async (req, res) => {
  try {
    const response = await UserModel.login(req.body);
    return res.json({
      message: response.message,
      user: response.user,
      status: true,
    });
  } catch (e) {
    return res.json({
      message: e,
      user: {},
      status: false,
    });
  }
};



export const register = async (req, res) => {
    const imageProfile =
      req.files?.photo !== undefined
        ? await uploadimage({ photo: req.files.photo })
        : "";
  
    // Encriptar la password  que enia el usuario
    const salt = bcrypt.genSaltSync();
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    req.body.imageProfile = imageProfile;
  
    try {
       const resRegister = await UserModel.register(req.body);

      return res.status(200).json({
        status: true,
        message: resRegister,
      });
    } catch (e) {
      return res.status(400).json({
        status: false,
        message: e,
      });
      throw e
    }
  };
  