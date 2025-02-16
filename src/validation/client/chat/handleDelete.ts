import axios from "axios";
import { mostrarMensaje } from "../../../components/tsx/toast";
import { linkBackend } from "../../../components/ts/urls";
const token = localStorage.getItem("ACCESS_TOKEN");

export function handleDelete(id:any, idUserOne:any) {
  const MensajeNegToast = document.getElementById("toast-negative");

  axios
    .delete(`${linkBackend}/intercambios/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        idUserOne,
      },
    })
    .then((response) => {
      response;
      window.location.reload();
    })
    .catch((error) => {
      if (error.response) {
        mostrarMensaje(error.response.data.error, MensajeNegToast);
      }
    });
}
