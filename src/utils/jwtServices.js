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
      { expiresIn: 60 * 60 * 24 * 7 }
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

  static decode(token) {
    return jwt.decode(token);
  }
}

export default JwtService;
