import React from "react";
import { NavBarSchedule } from "../../Components/ScheduleAppointmentComponents/NavBarSchedule";
import { AppointmentForm } from "../../Components/ScheduleAppointmentComponents/AppointmentForm";

export const ScheduleAppointment = () => {
  return (
    <>
      <NavBarSchedule />
      <AppointmentForm />
    </>
  );
};
