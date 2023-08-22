import RegisterService from "../services/auth/RegisterService.js";
import LoginService from "../services/auth/LoginService.js";

class UserController {
  static async createUser(req, res) {
    try {
      await RegisterService.createUser(req, res);
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async loginUser(req, res) {
    try {
      await LoginService.loginUser(req, res);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default UserController;
