
import axios from "axios";
import { linkBackend } from "../../components/ts/urls";

export async function handleGetUserId() {
  try {
    const userSession = localStorage.getItem("USER_SESSION");

    const parsedSession = userSession ? JSON.parse(userSession) : null;
    const id = parsedSession?.id;

    if (!id) {
      throw new Error("El usuario no existe.");
    }
    const response = await axios.get(`${linkBackend}/chats/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


