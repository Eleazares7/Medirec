import { serarchDoctorId } from "../Access/Test/Test.js";

export const GetAppointment = (app, dbMedirec) => {
    app.get("/getAppointments", async (req, res) => {
        const { user } = req.query;
        const idUser = user ? user.id_user : "";

        try {
            const idDoctor = await serarchDoctorId(dbMedirec, idUser);

            if (!idDoctor) {
                return res.status(404).json({ message: "No se encontró el doctor" });
            }

            const APPOINTMENTS_QUERY = `
            SELECT 
              medical_appointments.id_appointments,
              users.user_name,
              medical_appointments.appointment_reason,
              medical_appointments.appointment_date,
              medical_appointments.appointment_hour,
              medical_appointments.appointment_status
            FROM
              medical_appointments, users, patients, doctors
            WHERE
              users.id_user = patients.id_user 
              AND medical_appointments.id_patient = patients.id_patient
              AND medical_appointments.id_doctor = doctors.id_doctor
              AND doctors.id_doctor = ?
          `;

            dbMedirec.query(APPOINTMENTS_QUERY, [idDoctor], (err, results) => {
                if (err) return res.status(500).send(err);
                if (results.length === 0) {
                    return res.status(404).json({ message: "No hay citas programadas" });
                }
                res.json(results);
            });
        } catch (error) {
            console.error("Error al obtener citas:", error);
            res.status(500).send(error);
        }
    });

}