import React from "react";
import { useLocation } from "react-router-dom";
import { NavBarPatient } from "./NavBarPatient";
import { ServiceCards } from "./ServicesCards";
import { Container } from 'react-bootstrap';
import { useUser } from "../../Context/SaveUserData";



export const HomePatient = ()=> {

  
  const {user, logoutUser }= useUser();


  return (
    <>
      <NavBarPatient/>
      <Container className="mt-4">
        <h2>Bienvenido paciente {user? user.user_name: "usuario"}</h2>
        <ServiceCards />

      </Container>
      
    </>
  );
} 





