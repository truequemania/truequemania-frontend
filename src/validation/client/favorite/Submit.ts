import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { linkBackend } from "../../../components/ts/urls";
import { getUserEmailFromToken } from "../../../components/ts/getEmailtoken";

export const handleFavorito = async (
  articulo_name: string,
  navigate: NavigateFunction 
): Promise<number> => {
  const email_user = getUserEmailFromToken();
  console.log(articulo_name, "2");

  if (!articulo_name || !email_user) {
    alert("Faltan datos para hacer el match");
    throw new Error("Faltan datos");
  }

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
  };

  try {
    const response = await axios.post(
      `${linkBackend}/favorito`,
      { articulo_name, email_user },
      { headers }
    );

    alert(response.data.message);

    // if (response.data.match === "match") {
    //   navigate("/chats"); 
    // }

    return response.data.articulo_id;
  } catch (error: any) {
    alert(error.response?.data?.message);
    throw new Error(error.response?.data?.message || "Error desconocido");
  }
};
