import React from "react";
import { Router, RouterProvider, createBrowserRouter } from "react-router-dom";

import { NotFound } from "../Components/Page404/NotFound";

//User views
import { Home } from "../Views/Home/Home";
import { Login } from "../Views/Home/Login";
import { Register } from "../Views/Home/Register";
import { RegisterGoogle } from "../Views/Home/RegisterGoogle";
import { Otp } from "../Views/Home/Otp";
import { PatientHome } from "../Views/Patients/PatientHome";
import { ScheduleAppointment } from "../Views/Patients/ScheduleAppointment";

//Admin views
import { HomeAdmin } from "../Views/Admin/HomeAdmin";
import { AddDoctor } from "../Views/Admin/AddDoctor";
import { HomeDoctor } from "../Views/Doctor/HomeDoctor";
import { ManagePharmacy } from "../Views/Admin/ManagePharmacy";
import { AddMedicine } from "../Views/Admin/AddMedicine";
import { TableMedicines } from "../Views/Admin/TableMedicines";

//Protected Routes
import { ProtectedRoutes } from "./ProtectedRoutes";

const AppRouter = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/otp",
    element: <Otp />,
  },
  {
    path: "/googleRegister",
    element: <RegisterGoogle />,
  },
  {
    path: "/homePatient",
    element: (
      <ProtectedRoutes>
        <PatientHome />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/scheduleAppointment",
    element: (
      <ProtectedRoutes>
        <ScheduleAppointment />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/homeAdmin",
    element: (
      <ProtectedRoutes>
        <HomeAdmin />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/addDoctor",
    element: (
      <ProtectedRoutes>
        <AddDoctor />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/homeDoctor",
    element: (<ProtectedRoutes>
      <HomeDoctor />
    </ProtectedRoutes>)
  },
  {
    path: "/managePharmacy",
    element: (<ProtectedRoutes>
      <ManagePharmacy />
    </ProtectedRoutes>)
  },
  {
    path: "/addMedicine",
    element: (<ProtectedRoutes>
      <AddMedicine />
    </ProtectedRoutes>)
  },
  {
    path: "/tableMedicines",
    element: (<ProtectedRoutes>
      <TableMedicines />
    </ProtectedRoutes>)
  }
]);

export const Routes = () => {
  return (
    <>
      <RouterProvider router={AppRouter} />
    </>
  );
};
