import axios from "axios";

export const getMedicines = async () => {
    try {
        const { data } = await axios.get("http://localhost:3001/getMedicines"); // Desestructuración de response
        console.log(data); // Registro de los datos obtenidos
        return data; // Retorno explícito de los datos
    } catch (error) {
        console.error("Error al cargar los medicamentos: ", error); // Mensaje corregido
        throw new Error("No se pudo obtener la lista de medicamentos. Inténtelo de nuevo."); // Lanzar un error descriptivo
    }
};
