import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export const handleSubmit = (e, formData, navigate) => {
  e.preventDefault();
  Swal.fire({
    title: "¿Todos sus datos son correctos?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Si, lo son",
    denyButtonText: `Revisar`,
    icon: "question",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      axios
        .post("http://localhost:3001/AddPatient", formData)
        .then((response) => {
          const { message } = response.data.message;
          Swal.fire({
            title: message,
            icon: "success",
            text: "Al crear esta cuenta esta sujeto a terminos y condiciones",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          });
        })
        .catch((error) => {
          const message = error.response?.data?.message;
          Swal.fire({
            title: "Error!",
            text: message,
            icon: "error",
            confirmButtonText: "Ok",
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

const YourComponent = () => {
  return (
    <div>
      <Toaster />
    </div>
  );
};
