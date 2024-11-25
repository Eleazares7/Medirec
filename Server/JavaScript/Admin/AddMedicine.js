export const AddMedicine = (app, dbMedirec) => {
    app.post("/addMedicine", (req, res) => {
        const { newMedicine } = req.body;

        const INSERT_NEW_MEDICINE_QUERY =
            `INSERT INTO medicines (
            medicine_name,
            medicine_description,
            medicine_quantity,
            medicine_administration_type,
            medicine_stock
        ) VALUES (?, ?, ?, ?, ?)`;

        dbMedirec.query(INSERT_NEW_MEDICINE_QUERY, [
            newMedicine.medicine_name,
            newMedicine.medicine_description,
            newMedicine.medicine_quantity,
            newMedicine.medicine_administration_type,
            newMedicine.medicine_stock
        ], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Error al agregar el medicamento", Error: err });
            }

            return res.status(200).json({ message: `Medicamento ${newMedicine.medicine_name} registrado correctamente` })
        })
    })
}