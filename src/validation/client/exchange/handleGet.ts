import axios from "axios";
import { linkBackend } from "../../../components/ts/urls";

export async function handleGetUserIntercambios(email:string) {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");

    const response = await axios.get(`${linkBackend}/intercambios/session/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los intercambios:", error);
    throw error;
  }
}

export async function handleGetUserIntercambiosId(userId:number) {
  try {
    const response = await axios.get(`${linkBackend}/intercambios/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los intercambios:", error);
    throw error;
  }
}
