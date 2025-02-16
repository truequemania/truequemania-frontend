import axios from "axios";
import { linkBackend } from "../../components/ts/urls";

export async function handleGetUserId(id: any) {
  try {
    if (!id) {
      throw new Error(
        "El usuario no está autenticado o la sesión es inválida."
      );
    }
    const response = await axios.get(`${linkBackend}/users/${id}/details`);
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener los detalles del usuario:", error);
    throw new Error(
      error.response?.data?.message || "Ocurrió un error al obtener los datos."
    );
  }
}
