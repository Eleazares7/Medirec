import { AddPatient } from "./JavaScript/Access/AddPatient.js";
import { AddPatientGoogle } from "./JavaScript/Access/AddPatientGoogle.js";
import { Login } from "./JavaScript/Access/Login.js";
import { ValidateUser } from "./JavaScript/Access/ValidateUser.js";
import { GetSecretData } from "./JavaScript/Access/GetSecret.js";
import { verifyOTP } from "./JavaScript/Access/VerifyOtp.js";
import { GetStates } from "./JavaScript/GetAdressData/GetStates.js";
import { GetMunicipalities } from "./JavaScript/GetAdressData/GetMunicipalities.js";
import { GetColonies } from "./JavaScript/GetAdressData/GetColonies.js";

import { AddDoctor } from "./JavaScript/Admin/AddDoctor.js";
import { GetDoctors } from "./JavaScript/Admin/GetDoctors.js";
import { GenerateAppointment } from "./JavaScript/Patient/GenerateAppointment.js";
import { GetAppointment } from "./JavaScript/Doctor/GetAppointments.js";

import { GetMedicines } from "./JavaScript/Admin/getMedicines.js";
import { AddMedicine } from "./JavaScript/Admin/AddMedicine.js";
import { deleteMedicineById } from "./JavaScript/Admin/deleteMedicine.js";
import { getMedicineById } from "./JavaScript/Admin/getMedicineById.js";
import { updateMedicine } from "./JavaScript/Admin/updateMedicine.js";


export const setUpRoutes = (app, dbMedirec) => {
  //Register Patient
  AddPatient(app, dbMedirec);
  AddPatientGoogle(app, dbMedirec);
  Login(app, dbMedirec);
  ValidateUser(app, dbMedirec);
  GetSecretData(app, dbMedirec);
  verifyOTP(app, dbMedirec);
  //Get Adrees Data
  GetStates(app, dbMedirec);
  GetMunicipalities(app, dbMedirec);
  GetColonies(app, dbMedirec);

  AddDoctor(app, dbMedirec);
  GetDoctors(app, dbMedirec);
  GenerateAppointment(app, dbMedirec);
  GetAppointment(app, dbMedirec);
  GetMedicines(app, dbMedirec);
  AddMedicine(app,dbMedirec);
  deleteMedicineById(app,dbMedirec);
  getMedicineById(app,dbMedirec);
  updateMedicine(app,dbMedirec);

};
