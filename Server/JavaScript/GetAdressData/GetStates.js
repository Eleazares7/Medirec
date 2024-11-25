export const GetStates = (app, dbMedirec) => {
  app.get("/getStates", (req, res) => {
    const getStatesQuery = "SELECT * FROM states";

    dbMedirec.query(getStatesQuery, (err, results) => {
      err ? res.status(500).send(err) : res.json(results);
    });
  });
};
