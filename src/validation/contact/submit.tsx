import { FormEvent } from "react";
import axios from "axios";
import { mostrarMensaje } from "../../components/tsx/toast";
import { linkBackend } from "../../components/ts/urls";

export const Submit = async (
    event: FormEvent,
    name: string,
    email: string,
    message: string,
) => {
    event.preventDefault();
    
    const MensajeErrUsuario = document.getElementById("err");
    const MensajeActUsuario = document.getElementById("success");

    if (name === "") {
        mostrarMensaje("Ingrese su nombre", MensajeErrUsuario);
        return false;
    }

    if (email === "") {
        mostrarMensaje("Ingrese su correo", MensajeErrUsuario);
        return false;
    }

    if (message === "") {
        mostrarMensaje("Ingrese su mensaje", MensajeErrUsuario);
        return false;
    }

    try {
        const responseRegister = await axios.post(`${linkBackend}/contact`, { name, email, message });
        const mensaje = responseRegister.data.message;
        mostrarMensaje(mensaje, MensajeActUsuario);
        return true;
    } catch (error: any) {
        const message = error.response?.data.message;
        mostrarMensaje(message, MensajeErrUsuario);
        return false;
    }
};


