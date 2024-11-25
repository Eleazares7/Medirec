import React from 'react'
import axios from "axios";





export const getAppointments = async (user) => {
  try {
    const response = await axios.get("http://localhost:3001/getAppointments", { params: { user } });
    return response.data;
  } catch (error) {
    console.log(`Error a cargar los doctores ${error}`);
    throw error;
  }
}