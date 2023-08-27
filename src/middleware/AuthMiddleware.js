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
    // check id expired

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        console.error("JWT error:", error);
        return res.status(401).json({
          message: "Token is invalid",
        });
      }

      req.user = user;
      next();
    });
  }

  // static verifyAndAuthorization(req, res, next) {
  //   AuthMiddleware.verifyToken(req, res, () => {
  //     if (req.user.idreq.user.isAdmin) {
  //     } else {
  //       return res.status(403).json({
  //         message: "Access denied. User id does not match",
  //       });
  //     }
  //   });
  // }

  static verifyTokenAndAdmin(req, res, next) {
    AuthMiddleware.verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return res.status(403).json({
          message: "Access denied. Admin role required.",
        });
      }
    });
  }
}

export default AuthMiddleware;
