import React from "react";
import { NavBarAdmin } from "../../Components/HomeAdminComponents/NavBarAdmin";
import { AdminDashboard } from "../../Components/HomeAdminComponents/AdminDashBoard";
import { OptionsCardsAdmin } from "../../Components/HomeAdminComponents/OptionsCardsAdmin";

export const HomeAdmin = () => {
  return (
    <>
      <NavBarAdmin />
      <AdminDashboard />
      <OptionsCardsAdmin />
    </>
  );
};
