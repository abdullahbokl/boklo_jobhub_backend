import UserModel from "../../models/userModel.js";
import JwtService from "../../utils/jwtServices.js";
import EncryptionServices from "../../utils/encryptionServices.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { sanitizeDoc } from "../../utils/sanitize.js";
class UpdateUserService {
  static async updateUser(req, res, next) {
    try {
      const { password, skills = [], profilePic, ...restOfBody } = req.body;
      if (password) {
        restOfBody.password = await EncryptionServices.encryptText(password);
      }
      const updateObject = { $set: { ...restOfBody } };
      if (Array.isArray(skills) && skills.length > 0) updateObject.$set.skills = skills;
      if (typeof profilePic === "string" && profilePic.trim()) {
        updateObject.$push = { profilePic: { url: profilePic } };
      }
      const updatedUser = await UserModel.findByIdAndUpdate(req.user.id, updateObject, { new: true });
      const token = JwtService.sign({ id: updatedUser._id, isAdmin: updatedUser.isAdmin, isAgent: updatedUser.isAgent });
      return ApiResponse.success(res, { ...sanitizeDoc(updatedUser), token }, "Profile updated");
    } catch (error) {
      next(error);
    }
  }
}
export default UpdateUserService;
