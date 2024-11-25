import axios from "axios";

export const getColonies = async (municipalityId) =>{
    try {
        const response = await axios.get(`http://localhost:3001/colonies/${municipalityId}`);
        return response.data;
    } catch (error) {
        console.error(`Error to load colonies: ${error}`);
        throw error;        
    }
}