import axios from "axios";
import Swal from "sweetalert2";
export const updateMedicineById = async (idMedicine, callback) => {
  try {
    const response = await axios.post("http://localhost:3001/getMedicineById", {
      idMedicine,
    });

    if (!response.data) {
      Swal.fire({
        title: "Error",
        text: "No se encontró el medicamento con el ID proporcionado.",
        icon: "error",
      });
      return;
    }

    const medicineData = response.data;

    const { value: formValues } = await Swal.fire({
      title: "Actualizar Medicamento",
      html: `
        <div style="display: flex; flex-direction: column; gap: 15px; text-align: left;">
          <div>
            <label for="swal-input-id" style="font-weight: bold;">ID:</label>
            <input id="swal-input-id" class="swal2-input" value="${medicineData.id_medicine}" disabled>
          </div>
          <div>
            <label for="swal-input-name" style="font-weight: bold;">Nombre:</label>
            <input id="swal-input-name" class="swal2-input" value="${medicineData.medicine_name}" required>
          </div>
          <div>
            <label for="swal-input-description" style="font-weight: bold;">Descripción:</label>
            <textarea id="swal-input-description" class="swal2-textarea">${medicineData.medicine_description}</textarea>
          </div>
          <div>
            <label for="swal-input-stock" style="font-weight: bold;">Cantidad:</label>
            <input id="swal-input-stock" type="number" class="swal2-input" value="${medicineData.medicine_stock}" required>
          </div>
          <div>
            <label for="swal-input-admin" style="font-weight: bold;">Tipo de Administración:</label>
            <input id="swal-input-admin" class="swal2-input" value="${medicineData.medicine_administration_type}" required>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const name = document.getElementById("swal-input-name").value.trim();
        const description = document.getElementById("swal-input-description").value.trim();
        const stock = document.getElementById("swal-input-stock").value.trim();
        const adminType = document.getElementById("swal-input-admin").value.trim();

        if (!name || !description || !stock || !adminType) {
          Swal.showValidationMessage("Todos los campos son obligatorios");
          return null;
        }
        if (isNaN(stock) || stock <= 0) {
          Swal.showValidationMessage("La cantidad debe ser un número mayor a 0");
          return null;
        }

        return {
          id_medicine: medicineData.id_medicine,
          medicine_name: name,
          medicine_description: description,
          medicine_stock: parseInt(stock),
          medicine_administration_type: adminType,
        };
      },
    });

    if (formValues) {
      const updateResponse = await axios.post(
        "http://localhost:3001/updateMedicine",
        { formValues }
      );

      Swal.fire({
        title: "Medicamento Actualizado",
        text: updateResponse.data.message || "Datos actualizados correctamente",
        icon: "success",
      });

      // Llamar al callback con los datos actualizados
      if (callback) {
        callback(formValues);
      }
    }
  } catch (error) {
    console.error("Error al actualizar el medicamento:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudo actualizar el medicamento. Intenta nuevamente.",
      icon: "error",
    });
  }
};
