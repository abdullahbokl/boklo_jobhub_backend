import UserModel from "../../models/userModel.js";
import EncryptionServices from "../../utils/encryptionServices.js";
import JwtService from "../../utils/jwtServices.js";

class LoginService {
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

      const isMatch = await EncryptionServices.compare({
        text: password,
        encryptedText: user.password,
      });
      if (!isMatch) {
        return res.status(401).json({
          message: "Password is incorrect",
        });
      }

      const jwtToken = JwtService.sign({
        id: user._id,
        isAdmin: user.isAdmin,
        isAgent: user.isAgent,
      });

      const { password: omittedPassword, __v, ...userData } = user._doc;
      userData.token = jwtToken;

      return res.status(200).json({
        user: userData,
      });
    } catch (error) {
      return res.status(500).json({
        message: "User login failed",
        error: error.message.split(","),
      });
    }
  }
}

export default LoginService;
