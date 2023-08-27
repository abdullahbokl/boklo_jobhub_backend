import EncryptionServices from "../utils/encryptionServices.js";
import UserModel from "../models/userModel.js";
import JwtService from "../utils/jwtServices.js";
import UpdateUserService from "../services/users/updateUserService.js";

class UserController {
  static async updateUser(req, res) {
    await UpdateUserService.updateUser(req, res);
  }

  static async deleteUser(req, res) {
    try {
      await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  }

  static async getUser(req, res) {
    try {
      const user = await UserModel.findById(req.params.id);

      const { password: omittedPassword, __v, ...userData } = user._doc;

      userData.time = user._id.getTimestamp().toLocaleString();

      res.status(200).json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  }

  static async getAllUsers(req, res) {
    const query = req.query.new;
    try {
      const users = await UserModel.find();

      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  }
}

export default UserController;
