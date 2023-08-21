import AuthService from "../services/cryptoServices.js";
import UserModel from "../models/userModel.js";
import JwtService from "../services/jwtServices.js";

class UserController {
  static async createUser(req, res) {
    try {
      const { userName, email, password } = req.body;

      const encryptedPassword = await AuthService.encryptText(password);
      const user = new UserModel({
        userName,
        email,
        password: encryptedPassword,
      });

      await user.save();

      return res.status(201).json({
        message: "User created successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "User creation failed",
        error: error.message.split(","),
      });
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password, userName } = req.body;
      const query = email ? { email } : { userName };

      const user = await UserModel.findOne(query);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const decryptedPassword = await AuthService.decryptText(user.password);
      if (decryptedPassword !== password) {
        return res.status(401).json({
          message: "Password is incorrect",
        });
      }

      const { password: omittedPassword, __v, ...userData } = user._doc;

      const jwtToken = JwtService.sign({
        id: user._id,
        isAdmin: user.isAdmin,
        isAgent: user.isAgent,
      });

      return res.status(200).json({
        ...userData,
        userToken: jwtToken,
      });
    } catch (error) {
      return res.status(500).json({
        message: "User login failed",
        error: error.message.split(","),
      });
    }
  }
}

export default UserController;
