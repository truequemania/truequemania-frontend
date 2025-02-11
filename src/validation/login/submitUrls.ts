import axios from "axios";
import { linkBackend } from "../../components/ts/urls";
import { mostrarMensaje } from "../../components/tsx/toast";

export interface TokensData {token: any;}

export const submitUrls= async (tokens: any): Promise<TokensData | null> => {
    const MensajeErrUsuario = document.getElementById("MensajeErrUsuario");

    try {
        const responseSesion = await axios.patch(`${linkBackend}/users/tokens`, {}, {
            headers: {
                Authorization: `Bearer ${tokens}`,
            },
        });
        const token = responseSesion.data.token;
        return { token };
    } catch (error: any) {
        const message = error.response?.data.message;
        mostrarMensaje(message, MensajeErrUsuario);
        return null;
    }
}