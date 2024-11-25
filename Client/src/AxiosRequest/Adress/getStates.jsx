import axios from "axios";

export const getStates = async () =>{
    try{
        const response = await axios.get("http://localhost:3001/getStates");
        return response.data;
    }catch(error){
        console.log(`Error al cargar los estados ${error}`);
        throw error;   
    }
}