import axios from "axios";

export const getDoctors = async () => {
  try {
    const response = await axios.get("http://localhost:3001/getDoctors");
    return response.data;
  } catch (error) {
    console.log(`Error a cargar los doctores ${error}`);
    throw error;
  }
};
