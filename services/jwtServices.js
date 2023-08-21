import jwt from "jsonwebtoken";

class JwtService {
  static sign({ id, isAdmin, isAgent }) {
    this.ensureJwtSecretIsSet();

    const token = jwt.sign(
      {
        id,
        isAdmin,
        isAgent,
      },
      process.env.JWT_SECRET,
      { expiresIn: "21d" }
    );
    return token;
  }

  static verify(token) {
    this.ensureJwtSecretIsSet();

    return jwt.verify(token, process.env.JWT_SECRET);
  }

  static ensureJwtSecretIsSet() {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable is not set.");
    }
  }
}

export default JwtService;
