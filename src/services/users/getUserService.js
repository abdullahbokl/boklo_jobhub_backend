import UserModel from "../../models/userModel.js";

class GetUserService {
  static async getUser(req, res) {
    try {
      const user = await UserModel.findById(req.params.id);

      const { password: omittedPassword, __v, ...userData } = user._doc;

      res.status(200).json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  }
}

export default GetUserService;
