import cryptoServices from "../services/cryptoServices.js";
import UserModel from "../models/userModel.js";

class UserController {
  static async updateUser(req, res) {
    try {
      const { password, ...restOfBody } = req.body;
      const encryptedPassword = await cryptoServices.encryptText(password);

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
}

export default UserController;
