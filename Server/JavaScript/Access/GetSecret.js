import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"; // Importar dotenv

dotenv.config(); // Cargar variables de entorno

export const GetSecretData = (app, dbMedirec) => {
  app.post("/getDataSecret", (req, res) => {
    const { userId, data } = req.body;
    const JWT_SECRET = process.env.JWT_SECRET;
    const GET_USER_QUERY = "SELECT * FROM users WHERE id_user = ?";

    dbMedirec.query(GET_USER_QUERY, userId, async (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database query failed" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const encryptedDataSecret = result[0].encrypted_secret;
      const encryptedIvSecret = result[0].iv_secret;
      const encryptedDataQrCode = result[0].encrypted_qrcode;
      const encryptedIvQrCode = result[0].iv_qrcode;
      const key = Buffer.from(result[0].user_key, "base64");

      const decryptSecret = (key, iv, encryptedDataSecret) => {
        const decipher = crypto.createDecipheriv(
          "aes-256-cbc",
          key,
          Buffer.from(iv, "hex")
        );
        let decrypted = decipher.update(encryptedDataSecret, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
      };

      // Get token to protect routes
      const token = jwt.sign(
        {
          user_id: userId,
          username: data.user_name,
          role: data.id_rol,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      try {
        const secret = decryptSecret(
          key,
          encryptedIvSecret,
          encryptedDataSecret
        );
        const qrCode = decryptSecret(
          key,
          encryptedIvQrCode,
          encryptedDataQrCode
        );

        return res.status(200).json({
          secret,
          qrCode,
          token,
        });
      } catch (error) {
        return res.status(500).json({ error: "Decryption failed" });
      }
    });
  });
};
