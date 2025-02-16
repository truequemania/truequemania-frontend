import axios from "axios";
import { mostrarMensaje } from "../../../components/tsx/toast";
import { linkBackend } from "../../../components/ts/urls";

export function handleDelete(art: any) {
  const id = art.id;
  const MensajeNegToast = document.getElementById("toast-negative");

  const token = localStorage.getItem("ACCESS_TOKEN");

  if (!token) {
    mostrarMensaje("No tienes permiso para realizar esta acción", MensajeNegToast);
    return;
  }

  axios
    .delete(`${linkBackend}/categorias/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Elemento eliminado correctamente:", response.data);
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error al eliminar:", error);
      if (error.response) {
        mostrarMensaje(error.response.data.error, MensajeNegToast);
      } else {
        mostrarMensaje("Error al eliminar el elemento", MensajeNegToast);
      }
    });
}
