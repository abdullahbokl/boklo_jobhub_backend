import UserModel from "../../models/userModel.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { NotFoundError } from "../../utils/errors.js";
import { sanitizeDoc } from "../../utils/sanitize.js";
class GetUserService {
  static async getUser(req, res, next) {
    try {
      const user = await UserModel.findById(req.user.id);
      if (!user) return next(new NotFoundError("User not found"));
      return ApiResponse.success(res, sanitizeDoc(user));
    } catch (error) {
      next(error);
    }
  }
}
export default GetUserService;
