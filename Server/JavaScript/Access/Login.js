import bcrypt from "bcrypt";

export const Login = (app, dbMedirec) => {
  app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const LOGIN_USER_QUERY = "SELECT * FROM users WHERE user_email = ?";

    dbMedirec.query(LOGIN_USER_QUERY, [email], async (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error en la base de datos", error: err });

      if (result.length === 0)
        return res.status(404).json({ message: "Correo invalido" });

      const user = result[0];

      const match = await bcrypt.compare(password, user.user_password);

      if (!match)
        return res.status(401).json({ message: "Contraseña incorrecta" });

      return res
        .status(200)
        .json({ message: `Bienvenido ${user.user_name}`, user });
    });
  });
};
