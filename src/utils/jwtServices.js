import jwt from "jsonwebtoken";

class JwtService {
  static sign({ id, isAdmin, isAgent }) {
    this.#ensureSecret();
    return jwt.sign({ id, isAdmin, isAgent }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
    });
  }

  static signRefresh({ id }) {
    this.#ensureSecret();
    return jwt.sign(
      { id },
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET + "_refresh",
      {
        expiresIn: 60 * 60 * 24 * 30, // 30 days
      }
    );
  }

  static verify(token) {
    this.#ensureSecret();
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  static verifyRefresh(token) {
    this.#ensureSecret();
    return jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET + "_refresh"
    );
  }

  static decode(token) {
    return jwt.decode(token);
  }

  static #ensureSecret() {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not set");
  }

  // Keep old name for backwards compat
  static ensureJwtSecretIsSet() {
    this.#ensureSecret();
  }
}

export default JwtService;
