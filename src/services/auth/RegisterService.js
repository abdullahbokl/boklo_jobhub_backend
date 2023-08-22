import UserModel from "../../models/userModel.js";
import EncryptionServices from "../../utils/encryptionServices.js";

class RegisterService {
  static async createUser(req, res) {
    try {
      const { userName, email, password } = req.body;

      const encryptedPassword = await EncryptionServices.encryptText(password);
      const user = new UserModel({
        email,
        userName,
        password: encryptedPassword,
      });

      await user.save();

      const { password: omittedPassword, __v, ...userData } = user._doc;
      return res.status(201).json({
        message: "User created successfully",
        user: userData,
      });
    } catch (error) {
      if (error.code === 11000) {
        const errorMessage = error.keyValue.email
          ? "Email already exists"
          : error.keyValue.userName
          ? "User name already exists"
          : "User already exists";

        return res.status(409).json({
          message: errorMessage,
        });
      } else if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({
          message: "User creation failed",
          error: errors,
        });
      } else {
        return res.status(500).json({
          message: "User creation failed",
          error: error.message.split(","),
        });
      }
    }
  }
}

export default RegisterService;
