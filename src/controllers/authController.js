import RegisterService from "../services/auth/registerService.js";
import LoginService from "../services/auth/loginService.js";

class UserController {
  static async createUser(req, res) {
    await RegisterService.createUser(req, res);
  }

  static async loginUser(req, res) {
    await LoginService.loginUser(req, res);
  }
}

export default UserController;
