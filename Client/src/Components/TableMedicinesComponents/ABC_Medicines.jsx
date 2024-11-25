import React, { useState, useEffect } from "react";
import { getMedicines } from "../../AxiosRequest/TableMedicines/getMedicines";
import { deleteMedicineById } from "./deleteMedicineById";
import { updateMedicineById } from "./updateMedicineById";


export const ABC_Medicines = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const medicinesData = await getMedicines();
        setMedicines(medicinesData);
      } catch (error) {
        console.error("Error al obtener las medicinas", error);
      }
    };
    fetchMedicines();
  }, []);


  const handleUpdate = async (idMedicine) => {
    await updateMedicineById(idMedicine, (updatedMedicine) => {
      setMedicines((prevMedicines) =>
        prevMedicines.map((medicine) =>
          medicine.id_medicine === updatedMedicine.id_medicine
            ? updatedMedicine
            : medicine
        )
      );
    });
  };



  const handleDelete = async (idMedicine) => {
    await deleteMedicineById(idMedicine, () => {
      setMedicines((prevMedicines) =>
        prevMedicines.filter((medicine) => medicine.id_medicine !== idMedicine)
      );
    });
  };

  return (
    <div className="container mt-4">
      <h1>Tabla de Medicinas</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Tipo de Administración</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine.id_medicine}>
              <td>{medicine.id_medicine}</td>
              <td>{medicine.medicine_name}</td>
              <td>{medicine.medicine_description}</td>
              <td>{medicine.medicine_quantity}</td>
              <td>{medicine.medicine_administration_type}</td>
              <td>{medicine.medicine_stock}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleUpdate(medicine.id_medicine)}
                >
                  Actualizar
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(medicine.id_medicine)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};
