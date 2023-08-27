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
          message: "Invalid email or password",
        });
      }

      const isMatch = await EncryptionServices.compare({
        text: password,
        encryptedText: user.password,
      });
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const jwtToken = JwtService.sign({
        id: user._id,
        isAdmin: user.isAdmin,
        isAgent: user.isAgent,
      });

      const { password: omittedPassword, __v, _id, ...userData } = user._doc;
      userData.id = _id;
      userData.token = jwtToken;

      return res.status(200).json(userData);
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: error,
      });
    }
  }
}

export default LoginService;
