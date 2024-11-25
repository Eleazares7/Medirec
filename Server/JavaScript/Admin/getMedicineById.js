export const getMedicineById = (app, dbMedirec) => {
    app.post("/getMedicineById", (req, res) => {
      const { idMedicine } = req.body;
  
      if (!idMedicine) {
        return res.status(400).send({ message: "El ID del medicamento es requerido." });
      }
  
      const GET_MEDICINE_BY_ID_QUERY = "SELECT * FROM medicines WHERE id_medicine = ?";
  
      dbMedirec.query(GET_MEDICINE_BY_ID_QUERY, [idMedicine], (err, results) => {
        if (err) {
          console.error("Error al obtener el medicamento por ID:", err);
          return res.status(500).send({ message: "Error interno del servidor." });
        }
  
        if (results.length === 0) {
          return res.status(404).send({ message: "Medicamento no encontrado." });
        }
  
        res.status(200).send(results[0]); // Enviar solo el medicamento encontrado
      });
    });
  };
  