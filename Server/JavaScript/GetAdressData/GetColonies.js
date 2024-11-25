export const GetColonies = (app, dbMedirec) => {
  app.get("/colonies/:municipality", (req, res) => {
    const { municipality } = req.params;
    const getMunicipalitiesQuery =
      "SELECT * FROM colonies WHERE id_municipality = ?";

    dbMedirec.query(getMunicipalitiesQuery, [municipality], (err, results) => {
      err ? res.status(500).send(err) : res.json(results);
    });
  });
};
