class DataValidator {
  // email validation

  static isValidEmail(data) {
    const emailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
    return emailRegex.test(data);
  }

  static validateEmail(data) {
    const errors = [];

    if (!data.includes("@")) {
      errors.push("Email must contain @");
    }

    if (!data.includes(".")) {
      errors.push("Email must contain .");
    }

    if (data.includes(" ")) {
      errors.push("Email must not contain spaces");
    }

    if (data.includes("\n")) {
      errors.push("Email must not contain new lines");
    }

    if (errors.length > 0) return errors;

    // validae lengths

    const [username, domain] = data.split("@");
    const [, topLevelDomain] = domain.split(".");

    if (username.length < 3) {
      errors.push("Email must contain a username with at least 3 characters");
    }

    if (topLevelDomain.length < 2) {
      errors.push(
        "Email must contain a top-level domain with at least 2 characters"
      );
    }

    if (domain.split(".")[0].length < 2) {
      errors.push("Email must contain a domain with at least 1 character");
    }

    return errors;
  }

  // password validation

  static isValidPassword(data) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(data);
  }

  static validatePassword(data) {
    const errors = [];

    if (!/^.{8,}$/.test(data)) {
      errors.push("Password must be at least 8 characters");
    }

    if (!/[a-z]/.test(data)) {
      errors.push("Password must contain at least 1 lowercase letter");
    }

    if (!/[A-Z]/.test(data)) {
      errors.push("Password must contain at least 1 uppercase letter");
    }

    if (!/\d/.test(data)) {
      errors.push("Password must contain at least 1 number");
    }

    if (!/[!@#$%^&*]/.test(data)) {
      errors.push("Password must contain at least 1 symbol (!@#$%^&*)");
    }

    return errors;
  }

  // username validation

  static isValidUserName(data) {
    return data.length < 3;
  }

  static validateUserName(data) {
    const errors = [];

    if (data.length < 3) {
      errors.push("Username must be at least 3 characters");
    }

    return errors;
  }
}

export default DataValidator;
