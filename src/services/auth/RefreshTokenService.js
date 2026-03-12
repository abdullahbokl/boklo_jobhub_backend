import UserModel from "../../models/userModel.js";
import JwtService from "../../utils/jwtServices.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { UnauthorizedError } from "../../utils/errors.js";
class RefreshTokenService {
  static async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const payload = JwtService.verifyRefresh(refreshToken);
      const user = await UserModel.findById(payload.id);
      if (!user || user.refreshToken !== refreshToken) {
        return next(new UnauthorizedError("Invalid refresh token"));
      }
      const token = JwtService.sign({ id: user._id, isAdmin: user.isAdmin, isAgent: user.isAgent });
      const newRefresh = JwtService.signRefresh({ id: user._id });
      await UserModel.findByIdAndUpdate(user._id, { refreshToken: newRefresh });
      return ApiResponse.success(res, { token, refreshToken: newRefresh }, "Token refreshed");
    } catch (error) {
      next(error);
    }
  }
  static async logout(req, res, next) {
    try {
      await UserModel.findByIdAndUpdate(req.user.id, { refreshToken: null });
      return ApiResponse.success(res, null, "Logged out successfully");
    } catch (error) {
      next(error);
    }
  }
}
export default RefreshTokenService;
