import CryptoJS from "crypto-js";
import bcrypt from "bcryptjs";

class BcryptServices {
  static async encryptText(text) {
    try {
      const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT));
      const encryptedText = await bcrypt.hash(text, salt);
      return encryptedText;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  static async compare({ text, encryptedText }) {
    try {
      const isMatch = await bcrypt.compare(text, encryptedText);
      return isMatch;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}

class CryptoService {
  static async encryptText(text) {
    const encryptedText = CryptoJS.AES.encrypt(
      text,
      process.env.SECRET_KEY
    ).toString();
    return encryptedText;
  }

  static async decryptText(encryptedText) {
    const decryptedText = CryptoJS.AES.decrypt(
      encryptedText,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
    return decryptedText;
  }
}

export default BcryptServices;

export { CryptoService };
