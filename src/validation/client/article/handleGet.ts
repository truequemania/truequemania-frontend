import axios from "axios";
import { linkBackend } from "../../../components/ts/urls";

export async function handleGet() {
    try {
        const response = await axios.get(`${linkBackend}/articulos`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function handleGetUsername() {
    try {
        const userSession = localStorage.getItem("USER_SESSION");

        const parsedSession = userSession ? JSON.parse(userSession) : null;
        const id = parsedSession?.id;

        if (!id) {
            throw new Error("El usuario no existe.");
        }
        const response = await axios.get(`${linkBackend}/articulos/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
