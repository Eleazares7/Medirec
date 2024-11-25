import bycript from "bcrypt";
import qrCode from "qrcode";
import speakeasy from "speakeasy";
import crypto from "crypto";

import { TestDate, analyzePassword, checkUserEmail } from "./Test/Test.js";

export const AddPatientGoogle = (app, dbMedirec) => {
  app.post("/addPatientGoogle", async (req, res) => {
    const { formData, userData } = req.body;

    const rol = "patient";

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bycript.hash(
      formData.user_password,
      saltRounds
    );

    // Generate key to encrypt secret and QR code
    const key = crypto.randomBytes(32);
    const keyBase64 = key.toString("base64");

    // Generate secret
    const secret = speakeasy.generateSecret({ length: 20 });
    const user_secret = secret.base32;

    // Generate QR code
    const user_qr = await new Promise((resolve, reject) => {
      qrCode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
        err ? reject(err) : resolve(dataUrl);
      });
    });

    // Function to encrypt QR code
    const encrypt = (data) => {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
      let encrypted = cipher.update(data, "utf-8", "hex") + cipher.final("hex");
      return {
        encryptedData: encrypted,
        iv: iv.toString("hex"),
      };
    };

    // Encrypt secret and QR code
    const encryptedSecret = encrypt(user_secret);
    const encryptedQrCode = encrypt(user_qr);

    //Verify user_date
    const dateErrors = TestDate(formData.patient_birthday_date);
    if (dateErrors.length != 0)
      return res.status(400).json({ message: dateErrors });

    const testPassword = analyzePassword(formData.user_password);

    //Verify email not match in database
    const emailExists = await checkUserEmail(dbMedirec, formData.user_email);

    if (emailExists)
      return res
        .status(400)
        .json({ message: "El correo introducido ya pertenece a un  usuario" });

    //Verify strong of password
    if (!testPassword.validate)
      return res.status(400).json({ message: testPassword.message });

    // Insert into the database
    const INSERT_USER_QUERY = `
      INSERT INTO users (
        user_name,
        user_paternalSurname,
        user_maternalSurname,
        user_phone,
        id_state,
        id_municipality,
        id_cologne,
        user_email,
        user_password,
        user_key,
        iv_secret,
        encrypted_secret,
        iv_qrcode,
        encrypted_qrcode,
        user_google_image,
        id_rol
      ) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    dbMedirec.query(
      INSERT_USER_QUERY,
      [
        formData.user_name,
        formData.user_paternalSurname,
        formData.user_maternalSurname,
        formData.user_phone,
        formData.id_state,
        formData.id_municipality,
        formData.id_cologne,
        formData.user_email,
        hashedPassword,
        keyBase64,
        encryptedSecret.iv,
        encryptedSecret.encryptedData,
        encryptedQrCode.iv,
        encryptedQrCode.encryptedData,
        userData.imageUrl,
        rol,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ message: "Error al agregar usuario", error: err });
        }

        const userId = result.insertId;

        // Insert data into the 'patients' table
        const INSERT_PATIENT_QUERY = `
          INSERT INTO patients (
            id_user,
            patient_birthday_date,
            patient_allergies
          ) VALUES (?, ?, ?)`;

        dbMedirec.query(
          INSERT_PATIENT_QUERY,
          [userId, formData.patient_birthday_date, formData.patient_allergies],
          (err) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Error al agregar al paciente", error: err });
            }

            // Retrieve the full user record
            const SEARCH_USER_BY_ID = `SELECT * FROM users WHERE id_user = ?`;
            dbMedirec.query(SEARCH_USER_BY_ID, [userId], (err, result) => {
              if (err) {
                return res.status(500).json({
                  message: "Error al obtener usuario después de registro",
                  error: err,
                });
              }

              const user = result[0];
              return res
                .status(200)
                .json({ message: "Usuario registrado correctamente", user });
            });
          }
        );
      }
    );
  });
};
