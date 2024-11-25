import axios from "axios";

export const getMunicipalities = async (stateId) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/getMunicipalities/${stateId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Erro to load Municipalites: ${error}`);
    throw error;
  }
};
