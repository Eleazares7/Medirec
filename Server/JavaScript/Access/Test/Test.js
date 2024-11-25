export const TestEmail = async (dbMedirec, email) => {
  const SEARCH_EMAIL_USER = "SELECT * FROM users WHERE user_email = ?";

  return new Promise((resolve, reject) => {
    dbMedirec.query(SEARCH_EMAIL_USER, [email], (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        reject(err); // Reject the promise with the error
      } else if (results && results.length > 0) {
        resolve(true); // Resolve with true if email exists
      } else {
        resolve(false); // Resolve with false if no result is found
      }
    });
  });
};

export const checkUserEmail = async (dbMedirec, user_email) => {
  try {
    const emailExists = await TestEmail(dbMedirec, user_email);
    return emailExists;
  } catch (error) {
    console.error("Error checking email:", error);
    throw new Error("Error checking email");
  }
};

export const serarchDoctorId = async (dbMedirec, id_user) => {
  const SEARCH_DOCTOR_BY_ID = `
    SELECT id_doctor 
    FROM doctors, users 
    WHERE doctors.id_user = users.id_user 
      AND users.id_user = ?
  `;

  try {
    const idDoctor = await new Promise((resolve, reject) => {
      dbMedirec.query(SEARCH_DOCTOR_BY_ID, [id_user], (err, results) => {
        if (err) {
          console.error("Error en la consulta de id_doctor:", err);
          return reject(err);
        }

        if (results.length === 0) {
          console.log("No se encontró un doctor para el usuario:", id_user);
          return resolve("");
        }

        resolve(results[0].id_doctor);
      });
    });
    console.log("ID del doctor encontrado:", idDoctor);
    return idDoctor;
  } catch (error) {
    console.error("Error al buscar id_doctor:", error);
    throw error;
  }
};


export const analyzePassword = (password) => {
  const MIN_LENGTH = 8;
  const COMMON_PASSWORDS = [
    "123456",
    "password",
    "qwerty",
    "12345678",
    "abcdef",
  ];
  const SPECIAL_CHARACTERS_REGEX = /[!@#$%^&*(),.?":{}|<>_]/;

  const errors = [];

  if (password.length < MIN_LENGTH) {
    errors.push("8 Caracteres");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Mayuscula");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Minuscula");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Números");
  }
  if (!SPECIAL_CHARACTERS_REGEX.test(password)) {
    errors.push("Caracter especial");
  }
  if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
    errors.push("Contraseña coincide con las más comunes del mundo");
  }

  if (errors.length > 0) {
    return {
      message: "La contraseña debe tener almenos:\n " + errors, // Join all errors into a single message
      validate: false,
    };
  }

  return { message: "ok", validate: true };
};

export const TestDate = (user_date) => {
  const date = new Date(user_date); // Asume que user_date es una fecha válida
  const patientYear = date.getUTCFullYear();
  const patientMonth = String(date.getUTCMonth() + 1).padStart(2, "0"); // Sumar 1 para ajustar el mes
  const patientDay = String(date.getUTCDate()).padStart(2, "0"); // Día del mes
  const patientDate = `${patientYear}-${patientMonth}-${patientDay}`;

  // Get today's date
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const todayDate = `${year}-${month}-${day}`;

  const errors = [];

  // iIt is not possible to be born in this year
  if (year == patientYear || patientYear > year || patientYear < 1924) {
    errors.push("Elige una fecha valida");
    return errors;
  }

  // if age  < 18 is not possible create account
  const age = year - patientYear;
  if (age < 18) {
    errors.push("Eres menor de edad no es posible crear una cuenta");
    return errors;
  }

  return [];
};

export const anayzeIdDoctor = (professionalID) => {
  const idLength = professionalID.length;
  if (idLength == 7 || idLength == 8) {
    return true;
  }
  return false;
};

export const testDateAppointment = (appointmentDate) => {
  const date = new Date(appointmentDate);
  const dateYear = date.getUTCFullYear();
  const dateMonth = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dateDay = String(date.getUTCDate()).padStart(2, "0");
  const completeDate = `${dateYear}-${dateMonth}-${dateDay}`;

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const todayDate = `${year}-${month}-${day}`;

  return dateYear < year ? false : true;
};


//------------------Check if this date is possible in appointmet--------------------------//
export const checkAppointmentAvailability = async (
  dbMedirec,
  hourAppointment,
  dateAppointment,
  id_doctor
) => {
  const SEARCH_DATE_MATCH = `SELECT * FROM medical_appointments WHERE  appointment_hour = ? AND appointment_date = ?  AND id_doctor = ? `;
  try {
    const testAppointmentDate = await new Promise((resolve, reject) => {
      dbMedirec.query(
        SEARCH_DATE_MATCH,
        [hourAppointment, dateAppointment, id_doctor],
        (err, results) => {
          if (err) return reject(err);

          if (results.length == 0) resolve({ validate: false });

          let suggestHour = scheduleSuggestion(hourAppointment);
          resolve({ validate: true, suggestedTime: suggestHour });
        }
      );
    });

    return testAppointmentDate;
  } catch (error) {
    console.error("Error al verificar disponibilidad de la cita:", error);
    throw error;
  }
};


//-----------------------Suggestion user to hour appointmet-------------------------------//
const scheduleSuggestion = (hour) => {
  let [hours, minutes] = hour.split(":").map(Number);
  let date = new Date();
  date.setHours(hours, minutes, 0, 0);

  let additionalHours = 1;
  date.setHours(date.getHours() + additionalHours);

  let resultHour = date.toTimeString().slice(0, 5);

  return resultHour;
};

//-----------------------Search a Patient with ID USER------------------------------------//
export const searchIdPatient = async (dbMedirec, id_user) => {
  const SEARCH_PATIENT_BY_ID =
    "SELECT id_patient FROM patients, users WHERE patients.id_user = users.id_user AND users.id_user = ?";

  try {
    const idPatient = await new Promise((resolve, reject) => {
      dbMedirec.query(SEARCH_PATIENT_BY_ID, [id_user], (err, results) => {
        if (err) return reject(err);

        if (results.length === 0) return resolve("");

        resolve(results[0].id_patient);
      });
    });

    return idPatient;
  } catch (error) {
    console.error("No hay id_patient", error);
    throw error;
  }
};

