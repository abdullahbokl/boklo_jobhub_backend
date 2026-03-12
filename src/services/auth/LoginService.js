import UserModel from "../../models/userModel.js";
import EncryptionServices from "../../utils/encryptionServices.js";
import JwtService from "../../utils/jwtServices.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { sanitizeDoc } from "../../utils/sanitize.js";
import { UnauthorizedError, NotFoundError } from "../../utils/errors.js";
class LoginService {
  static async loginUser(req, res, next) {
    try {
      const { email, password, userName } = req.body;
      const query = email ? { email } : { userName };
      const user = await UserModel.findOne(query);
      if (!user) return next(new NotFoundError("Invalid email or password"));
      const isMatch = await EncryptionServices.compare({ text: password, encryptedText: user.password });
      if (!isMatch) return next(new UnauthorizedError("Invalid email or password"));
      const token = JwtService.sign({ id: user._id, isAdmin: user.isAdmin, isAgent: user.isAgent });
      const refreshToken = JwtService.signRefresh({ id: user._id });
      await UserModel.findByIdAndUpdate(user._id, { refreshToken });
      return ApiResponse.success(res, { ...sanitizeDoc(user), token, refreshToken }, "Login successful");
    } catch (error) {
      next(error);
    }
  }
}
export default LoginService;
