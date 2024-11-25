export const updateMedicine = (app, dbMedirec) => {
  app.post("/updateMedicine", (req, res) => {
    const { formValues } = req.body;

    // Validar si formValues tiene todos los datos necesarios
    if (
      !formValues ||
      !formValues.id_medicine ||
      !formValues.medicine_name ||
      !formValues.medicine_description ||
      !formValues.medicine_stock || // Validar stock, no quantity
      !formValues.medicine_administration_type
    ) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    // Extraer datos individuales de formValues
    const {
      id_medicine,
      medicine_name,
      medicine_description,
      medicine_stock, // Usar el nombre correcto
      medicine_administration_type,
    } = formValues;

    console.log("Datos recibidos para actualizar:", {
      id_medicine,
      medicine_name,
      medicine_description,
      medicine_stock,
      medicine_administration_type,
    });

    // Crear una consulta SQL para actualizar los datos
    const UPDATE_MEDICINE_QUERY = `
      UPDATE medicines
      SET
        medicine_name = ?,
        medicine_description = ?,
        medicine_stock = ?, -- Cambiar a stock en la consulta
        medicine_administration_type = ?
      WHERE id_medicine = ?`;

    dbMedirec.query(
      UPDATE_MEDICINE_QUERY,
      [
        medicine_name,
        medicine_description,
        medicine_stock, // Usar el nombre correcto
        medicine_administration_type,
        id_medicine,
      ],
      (err, results) => {
        if (err) {
          console.error("Error al actualizar el medicamento:", err);
          return res.status(500).json({ message: "Error interno del servidor." });
        }

        if (results.affectedRows === 0) {
          return res
            .status(404)
            .json({ message: "No se encontró el medicamento con el ID proporcionado." });
        }

        res.status(200).json({ message: "Medicamento actualizado correctamente." });
      }
    );
  });
};
