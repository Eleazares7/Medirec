import bycrpt from "bcrypt";
import crypto from "crypto";
import speakeasy from "speakeasy";
import qrCode from "qrcode";

import {
  analyzePassword,
  checkUserEmail,
  anayzeIdDoctor,
} from "../Access/Test/Test.js";

export const AddDoctor = (app, dbMedirec) => {
  app.post("/addDoctor", async (req, res) => {
    const { formData } = req.body;
    const rol = "doctor";
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bycrpt.hash(
      formData.user_password,
      saltRounds
    );

    //Generate key to encrypt secret and QR code
    const key = crypto.randomBytes(32);
    const keyBase64 = key.toString("base64");

    //Generate secret
    const secret = speakeasy.generateSecret({ length: 20 });
    const user_secret = secret.base32;

    //Generate QR code
    const user_qr = await new Promise((resolve, reject) => {
      qrCode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
        err ? reject(err) : resolve(dataUrl);
      });
    });

    // Function to encrypt Qr code and secret
    const encrypt = (data) => {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
      let encrypted = cipher.update(data, "utf8", "hex") + cipher.final("hex");
      return {
        encryptedData: encrypted,
        iv: iv.toString("hex"),
      };
    };

    //Encrypt secret and QR code

    const encryptedSecret = encrypt(user_secret);
    const encryptedQrCode = encrypt(user_qr);

    const testPassword = analyzePassword(formData.user_password);

    // Verify email not match in database
    const emailExists = await checkUserEmail(dbMedirec, formData.user_email);

    if (emailExists)
      return res
        .status(400)
        .json({ message: "El correo introducido ya pertence a un usuario" });

    //Verify password is strong
    checkUserEmail(dbMedirec, formData.user_email);
    if (!testPassword.validate)
      return res.status(400).json({ message: testPassword.message });

    //Verify doctor's professional ID
    const isVerifiedId = anayzeIdDoctor(
      formData.doctor_licence_number_profesional
    );
    if (!isVerifiedId) {
      return res.status(400).json({ message: "Cedula no valida" });
    }

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
        formData.user_google_image,
        rol,
      ],
      (err, result) => {
        if (err) {
          console.log(err);

          return res
            .status(500)
            .json({ message: "Error al agregar usuario", Error: err });
        }

        const userId = result.insertId;

        // Insert data into the 'patients' table
        const INSERT_DOCTOR_QUERY = `
      INSERT INTO doctors (
        id_user,
        doctor_specialty	,
        doctor_licence_number_profesional
      ) VALUES (?, ?, ?)`;

        dbMedirec.query(
          INSERT_DOCTOR_QUERY,
          [
            userId,
            formData.doctor_speciality,
            formData.doctor_licence_number_profesional,
          ],
          (err) => {
            if (err) {
              console.log(formData.doctor_specialty);

              return res
                .status(500)
                .json({ message: "Error al agregar al doctor", error: err });
            }
            res
              .status(200)
              .json({ message: "Usuario registrado correctamente" });
          }
        );
      }
    );
  });
};
