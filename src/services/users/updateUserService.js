import UserModel from "../../models/userModel.js";
import JwtService from "../../utils/jwtServices.js";
import EncryptionServices from "../../utils/encryptionServices.js";

class UpdateUserService {
  static async updateUser(req, res) {
    try {
      const { password, skills = [], profilePic, ...restOfBody } = req.body;

      if (password) {
        const encryptedPassword = await EncryptionServices.encryptText(
          password
        );
        restOfBody.password = encryptedPassword;
      }

      const updateObject = {
        $set: restOfBody,
      };

      if (Array.isArray(skills) && skills.length > 0) {
        updateObject.$set.skills = skills;
      }

      if (typeof profilePic === "string" && profilePic.trim() !== "") {
        const newProfilePic = {
          url: profilePic,
        };

        updateObject.$push = { profilePic: newProfilePic };
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        req.user.id,
        updateObject,
        { new: true }
      );

      const jwtToken = JwtService.sign({
        id: req.user.id,
        isAdmin: req.user.isAdmin,
        isAgent: req.user.isAgent,
      });

      const {
        password: omittedPassword,
        __v,
        _id,
        ...userData
      } = updatedUser._doc;

      userData.token = jwtToken;
      userData.id = _id;

      res.status(200).json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  }
}

export default UpdateUserService;
