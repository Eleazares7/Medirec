import Swal from "sweetalert2";
import axios from "axios";

export const deleteMedicineById = async (idMedicine, onSuccess) => {
  Swal.fire({
    title: `¿Está seguro de borrar el medicamento con ID ${idMedicine}?`,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Sí, estoy seguro",
    denyButtonText: "No",
    icon: "warning",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/deleteMedicine/${idMedicine}`
        );

        Swal.fire({
          title: "Acción realizada correctamente",
          icon: "success",
          text:
            response.data.message ||
            `Medicamento con ID ${idMedicine} borrado correctamente.`,
          confirmButtonText: "Ok",
        });

        // Llamar al callback para actualizar el estado
        onSuccess();
      } catch (error) {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "No se pudo borrar el medicamento. Inténtalo nuevamente.",
          confirmButtonText: "Cerrar",
        });
        console.error("Error al borrar el medicamento:", error);
      }
    } else if (result.isDenied) {
      Swal.fire("Acción cancelada", "", "info");
    }
  });
};
