export const GetMedicines = (app, dbMedirec) => {
  app.get("/getMedicines", (req, res) => {
    const GET_MEDICINES_QUERY = "SELECT * FROM medicines";

    dbMedirec.query(GET_MEDICINES_QUERY, (err, results) => {
      if (err) {
        console.error("Error al obtener las medicinas:", err);
        return res.status(500).json({
          error: true,
          message: "Error al obtener las medicinas. Inténtelo más tarde.",
        });
      }

      return res.status(200).json(results);
    });
  });
};
