import React, { useEffect } from "react";
import { NavBar } from "../../Components/Home/NavBar";
import { PromoCard } from "../../Components/Home/PromoCard";
import { ServicesCards } from "../../Components/Home/ServicesCard/ServicesCard";
import { PromoPharmacy } from "./../../Components/Home/PromoPharmacy";
import { PromoSolutionsCard } from "../../Components/Home/PromoSolutionsCard";
import { HowToSchedule } from "../../Components/Home/HowToSchedule";
import { Footer } from "../../Components/Home/Footer";

export const Home = () => {
  return (
    <>
      <NavBar />
      <PromoCard />
      <ServicesCards />
      <PromoPharmacy />
      <PromoSolutionsCard />
      <HowToSchedule />
      <Footer />
    </>
  );
};
