export const GetDoctors = (app, dbMedirec) => {
  app.get("/getDoctors", (req, res) => {
    const getDoctosrQuery = "Select * from users , doctors WHERE users.id_user = doctors.id_user"

    dbMedirec.query(getDoctosrQuery, (err, results) => {
      err ? res.status(500).send(err) : res.json(results);
    })
  });
};