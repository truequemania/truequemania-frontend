import axios from "axios";
import { linkBackend } from "../../../components/ts/urls";
import { getUserEmailFromToken } from "../../../components/ts/getEmailToken";

export const handleDelete = async (articulo_id: number): Promise<void> => {

  const email_user = getUserEmailFromToken();

  if (!email_user) {
    throw new Error("No se encontró el email en el token.");
  }
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
  };

  try {
    const response = await axios.delete(`${linkBackend}/favorito`, {
      headers,
      params: { articulo_id, email_user },
    });
    alert(response.data.message);
    window.location.reload();
  } catch (error: any) {
    console.error("Error al eliminar favorito:", error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Error desconocido");
  }
};

export const handleDeleteFav = async (articulo_id: number): Promise<void> => {
  const email_user = getUserEmailFromToken();
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
  };

  try {
    await axios.delete(`${linkBackend}/favorito`, {
      headers,
      params: { articulo_id, email_user },
    });
  } catch (error: any) {
    alert(error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Error desconocido");
  }
};
