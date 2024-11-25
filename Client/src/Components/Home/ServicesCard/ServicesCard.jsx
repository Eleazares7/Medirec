import React from "react";
import { Container, Row } from "react-bootstrap";
import { IndividualServicesCard } from "./IndividualServicesCards";

{
  /** Import Images */
}
import MedicalAppointment from "../../../assets/Images/HomeImages/MedicalAppointment.jpg";
import PersonalConsultation from "../../../assets/Images/HomeImages/PersonalConsultation.jpg";
import ServicesAndCare from "../../../assets/Images/HomeImages/ServicesAndCare.jpg";
import PayOnLine from "../../../assets/Images/HomeImages/PayOnLine.jpg";
import Pharmacy from "../../../assets/Images/HomeImages/Pharmacy.jpg";
import Doctors from "../../../assets/Images/HomeImages/Doctors.jpg";

export const ServicesCards = () => {
  return (
    <>
      <Container id="servicios">
        <Row className="mt-4">
          <div className="text-center w-100">
            <h2>Servicios y comodidades que ofrecemos</h2>
            <p className="lead">
              Descubre las soluciones en línea que te ofrecemos para disfrutar
              de una experiencia exepcional desde la comodidad de tu hogar
            </p>
          </div>
        </Row>

        <Row className="mt-4">
          <IndividualServicesCard
            imgSrc={MedicalAppointment}
            title="Consulta General"
          />
          <IndividualServicesCard
            imgSrc={PersonalConsultation}
            title="Consulta Personalizada"
          />
          <IndividualServicesCard
            imgSrc={ServicesAndCare}
            title="Servicios y Cuidados"
          />
          <IndividualServicesCard imgSrc={PayOnLine} title="Pago en línea" />
          <IndividualServicesCard imgSrc={Pharmacy} title="Farmacia" />
          <IndividualServicesCard imgSrc={Doctors} title="Nuestro médicos" />
        </Row>
      </Container>
    </>
  );
};
