export const deleteMedicineById = (app, dbMedirec) => {
  // Ruta DELETE para eliminar un medicamento
  app.delete("/deleteMedicine/:id", (req, res) => {
    const { id } = req.params;

    const DELETE_MEDICINE_QUERY = "DELETE FROM medicines WHERE id_medicine = ?";

    dbMedirec.query(DELETE_MEDICINE_QUERY, [id], (err, results) => {
      if (err) {
        console.error("Error al borrar el medicamento:", err);
        return res.status(500).json({ message: "Error al borrar el medicamento." });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Medicamento no encontrado." });
      }

      res.status(200).json({ message: `Medicamento con ID ${id} borrado correctamente.` });
    });
  });
};
