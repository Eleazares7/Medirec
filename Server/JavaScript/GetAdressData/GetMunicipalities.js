export const GetMunicipalities = (app, dbMedirec) => {
  app.get("/getMunicipalities/:state", (req, res) => {
    const { state } = req.params;
    const GetMunicipalitiesQuery =
      "SELECT * FROM municipalitys WHERE id_state = ?";

    dbMedirec.query(GetMunicipalitiesQuery, [state], (err, results) => {
      err ? res.status(500).send(err) : res.json(results);
    });
  });
};
