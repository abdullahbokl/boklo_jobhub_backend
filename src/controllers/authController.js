import RegisterService from "../services/auth/RegisterService.js";
import LoginService from "../services/auth/LoginService.js";
import RefreshTokenService from "../services/auth/RefreshTokenService.js";
class AuthController {
  static createUser(req, res, next) { return RegisterService.createUser(req, res, next); }
  static loginUser(req, res, next) { return LoginService.loginUser(req, res, next); }
  static refreshToken(req, res, next) { return RefreshTokenService.refresh(req, res, next); }
  static logout(req, res, next) { return RefreshTokenService.logout(req, res, next); }
}
export default AuthController;
