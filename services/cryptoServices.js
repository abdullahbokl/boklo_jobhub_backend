import CryptoJS from "crypto-js";

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

export default CryptoService;
