import axios from "axios";
import { linkBackend } from "../../components/ts/urls";
import { NavigateFunction } from "react-router-dom";

export const handleFavorito = async (
  articulo_id: number,
  navigate: NavigateFunction 
): Promise<number> => {
  const userSession = localStorage.getItem("USER_SESSION");
  const parsedSession = userSession ? JSON.parse(userSession) : null;
  const user_id = parsedSession?.id;

  if (!articulo_id || !user_id) {
    alert("Faltan datos para enviar el favorito");
    throw new Error("Faltan datos");
  }

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
  };

  try {
    const response = await axios.post(
      `${linkBackend}/favorito`,
      { articulo_id, user_id },
      { headers }
    );

    alert(response.data.message);

    if (response.data.match === "match") {
      navigate("/chats"); 
    }

    return response.data.articulo_id;
  } catch (error: any) {
    alert(error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Error desconocido");
  }
};
