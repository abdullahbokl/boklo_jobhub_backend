import validator from "../utils/dataValidator.js";

class InputValidationMiddleware {
  static validateRegisterInput(req, res, next) {
    const { userName, email, password } = req.body;
    const emailErrors = validator.validateEmail(email);
    if (emailErrors.length > 0) {
      return res.status(400).json({
        message: "Email is invalid",
      });
    }
    const passwordErrors = validator.validatePassword(password);
    if (passwordErrors.length > 0) {
      return res.status(400).json({
        message: "Password is invalid",
      });
    }

    const userNameErrors = validator.validateUserName(userName);
    if (userNameErrors.length > 0) {
      return res.status(400).json({
        message: "Username is invalid",
      });
    }

    next();
  }

  static validateLoginInput(req, res, next) {
    const { email, password, userName } = req.body;
    const query = email ? email : userName;

    if (validator.isValidEmail(query)) {
      const emailErrors = validator.validateEmail(email);
      if (emailErrors.length > 0) {
        return res.status(400).json({
          message: "Email is invalid",
        });
      }
    } else {
      const userNameErrors = validator.validateUserName(userName);
      if (userNameErrors.length > 0) {
        return res.status(400).json({
          message: "Username is invalid",
        });
      }
    }

    const passwordErrors = validator.validatePassword(password);
    if (passwordErrors.length > 0) {
      return res.status(400).json({
        message: "Password is invalid",
      });
    }

    next();
  }
}

export default InputValidationMiddleware;
