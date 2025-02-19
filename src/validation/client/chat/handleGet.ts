
import axios from "axios";
import { linkBackend } from "../../../components/ts/urls";
import { getUserEmailFromToken } from "../../../components/ts/getEmailToken";

export async function handleGetUserId() {
  try {
    const email = getUserEmailFromToken();
    const token = localStorage.getItem("ACCESS_TOKEN");

    if (!email) {
      throw new Error("No se encontró el email en el token.");
    }
    const response = await axios.get(`${linkBackend}/chats/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}


