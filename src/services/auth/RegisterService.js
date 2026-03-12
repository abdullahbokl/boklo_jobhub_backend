import UserModel from "../../models/userModel.js";
import EncryptionServices from "../../utils/encryptionServices.js";
import JwtService from "../../utils/jwtServices.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { sanitizeDoc } from "../../utils/sanitize.js";
import { ConflictError } from "../../utils/errors.js";
class RegisterService {
  static async createUser(req, res, next) {
    try {
      const { userName, email, password } = req.body;
      const encryptedPassword = await EncryptionServices.encryptText(password);
      const user = await new UserModel({ email, userName, password: encryptedPassword }).save();
      const token = JwtService.sign({ id: user._id, isAdmin: user.isAdmin, isAgent: user.isAgent });
      const refreshToken = JwtService.signRefresh({ id: user._id });
      await UserModel.findByIdAndUpdate(user._id, { refreshToken });
      const data = { ...sanitizeDoc(user), token, refreshToken };
      return ApiResponse.created(res, data, "Account created successfully");
    } catch (error) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyValue || {})[0] || "field";
        return next(new ConflictError(`${field} already exists`));
      }
      next(error);
    }
  }
}
export default RegisterService;
