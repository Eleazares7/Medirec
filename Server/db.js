import mysql from "mysql";

const dbMedirecConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "medirecd",
};

const dbMedirec = mysql.createConnection(dbMedirecConfig);

dbMedirec.connect((err) => {
  err
    ? console.error(`Error to conect database Medirec ${err}`)
    : console.log("Conection succesfully to database Medirec");
});

export { dbMedirec };
