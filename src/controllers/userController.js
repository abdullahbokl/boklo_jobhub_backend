import UserModel from "../models/userModel.js";
import UpdateUserService from "../services/users/updateUserService.js";
import GetUserService from "../services/users/getUserService.js";

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
    await GetUserService.getUser(req, res);
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
