import UserModel from "../models/userModel.js";
import UpdateUserService from "../services/users/updateUserService.js";
import GetUserService from "../services/users/getUserService.js";
import { ApiResponse } from "../utils/apiResponse.js";
class UserController {
  static getUser(req, res, next) { return GetUserService.getUser(req, res, next); }
  static updateUser(req, res, next) { return UpdateUserService.updateUser(req, res, next); }
  static async deleteUser(req, res, next) {
    try {
      await UserModel.findByIdAndDelete(req.user.id);
      return ApiResponse.success(res, null, "User deleted");
    } catch (error) {
      next(error);
    }
  }
}
export default UserController;
