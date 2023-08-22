import EncryptionServices from "../utils/encryptionServices.js";
import UserModel from "../models/userModel.js";

class UserController {
  static async updateUser(req, res) {
    try {
      const { password, ...restOfBody } = req.body;
      const encryptedPassword = await EncryptionServices.encryptText(password);

      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: { ...restOfBody, password: encryptedPassword },
        },
        { new: true }
      );

      const { password: omittedPassword, __v, ...userData } = updatedUser._doc;

      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deleteUser(req, res) {
    try {
      await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getUser(req, res) {
    try {
      const user = await UserModel.findById(req.params.id);

      const { password: omittedPassword, __v, ...userData } = user._doc;

      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getAllUsers(req, res) {
    const query = req.query.new;
    try {
      const users = await UserModel.find();

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default UserController;
