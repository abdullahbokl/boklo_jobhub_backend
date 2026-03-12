import jwt from "jsonwebtoken";
import { UnauthorizedError, ForbiddenError } from "../utils/errors.js";
class AuthMiddleware {
  static verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new UnauthorizedError("No token provided"));
    }
    const token = authHeader.split(" ")[1];
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      next(new UnauthorizedError("Invalid or expired token"));
    }
  }
  static verifyTokenAndAdmin(req, res, next) {
    AuthMiddleware.verifyToken(req, res, (err) => {
      if (err) return next(err);
      if (req.user?.isAdmin) return next();
      next(new ForbiddenError("Admin role required"));
    });
  }
  static verifyTokenAndAgent(req, res, next) {
    AuthMiddleware.verifyToken(req, res, (err) => {
      if (err) return next(err);
      if (req.user?.isAgent || req.user?.isAdmin) return next();
      next(new ForbiddenError("Agent role required"));
    });
  }
}
export default AuthMiddleware;
