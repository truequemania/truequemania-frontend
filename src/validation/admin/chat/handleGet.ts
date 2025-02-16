import axios from "axios";
import { linkBackend } from "../../../components/ts/urls";

export async function handleGet() {
    try {
        const response = await axios.get(`${linkBackend}/chats`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

