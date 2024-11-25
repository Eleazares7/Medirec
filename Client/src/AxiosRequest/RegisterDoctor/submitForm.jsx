import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export const handleSubmit = (e, formData, navigate) => {
  e.preventDefault();
  Swal.fire({
    title: "Todos los datos del medico son correctos?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Si, lo son",
    denyButtonText: "Revisar",
    icon: "question",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .post("http://localhost:3001/AddDoctor", { formData })
        .then((response) => {
          const message = response.data.message;
          Swal.fire({
            title: message,
            icon: "success",
            tex: "Doctor registrado con exito en el sistema",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/homeAdmin");
            }
          });
        })
        .catch((error) => {
          const message = error.response?.data?.message;
          Swal.fire({
            title: "Error!",
            text: message,
            icon: "error",
            confirmButtonText: "ok",
          });
        });
    } else if (result.isDenied) {
      Swal.fire(
        "Revise sus datos y confirme el guardado de datos cuando este seguro",
        "",
        "info"
      );
    }
  });
};
