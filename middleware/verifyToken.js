import jwt from "jsonwebtoken";

class AuthMiddleware {
  static verifyToken(req, res, next) {
    const authHeader = req.headers["x-access-token"];

    if (!authHeader) {
      return res.status(401).json({
        message: "Token not provided",
      });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        return res.status(401).json({
          message: "Token is invalid",
        });
      }

      console.log(user);
      req.user = user;
      next();
    });
  }

  static verifyAndAuthorization(req, res, next) {
    AuthMiddleware.verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return res.status(403).json({
          message: "Access denied. User id does not match",
        });
      }
    });
  }

  static requireAdminRole(req, res, next) {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({
        message: "Access denied. Admin role required.",
      });
    }
  }
}

export default AuthMiddleware;
