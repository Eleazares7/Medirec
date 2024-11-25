import { testDateAppointment } from "../Access/Test/Test.js";
import { checkAppointmentAvailability, searchIdPatient } from "../Access/Test/Test.js";

export const GenerateAppointment = (app, dbMedirec) => {
  app.post("/generateAppointment", async (req, res) => {
    const { appointmentData, id_user } = req.body;
    const dateAppointment = appointmentData.date;
    const hourAppointment = appointmentData.time;
    const id_doctor = appointmentData.doctor;
    const appointmentStatus = "active";


    const id_patient = await searchIdPatient(dbMedirec, id_user)

    const validateDate = testDateAppointment(appointmentData.date);

    if (!validateDate)
      return res.status(400).json({ message: "La fecha no es valida" });

    checkAppointmentAvailability(
      dbMedirec,
      hourAppointment,
      dateAppointment,
      id_doctor
    )
      .then((result) => {
        if (result.validate) {
          return res.status(400).json({
            message: `Ya hay una cita asignada para el ${dateAppointment} a las ${hourAppointment} le sugerimos agendar a las ${result.suggestedTime} o escojer otro medico con disposnibilidad`,
          });
        }
      })
      .catch((error) => {
        console.error("Error al verificar la disponibilidad:", error);
      });

    const INSERT_APPOINTMENT_QUERY = `INSERT INTO medical_appointments(
        id_patient,
        id_doctor,
        appointment_date,
        appointment_hour,
        appointment_reason,
        appointment_status
      ) VALUES (?, ?, ?, ?, ?, ?)`;

    dbMedirec.query(
      INSERT_APPOINTMENT_QUERY,
      [
        id_patient,
        id_doctor,
        dateAppointment,
        hourAppointment,
        appointmentData.reason,
        appointmentStatus
      ],
      (err) => {
        if (err) {
          console.log(err);
        } else {
          return res
            .status(200)
            .json({ message: "Cita agendada exitosamente. ¡No faltes!" });
        }
      }
    );
  });
};
