import { FormEvent } from "react";
import axios, { AxiosResponse } from "axios";
import { mostrarMensaje } from "../../components/tsx/toast";
import { linkBackend } from "../../components/ts/urls";

const token = localStorage.getItem("ACCESS_TOKEN");

interface CampanaResponse {
  message: string;
}

export const handleDescripcionSubmit = async (
  event: FormEvent,
  id: number,
  descripcion: string
): Promise<AxiosResponse<CampanaResponse> | null> => {
  event.preventDefault();

  const MensajeErr = document.getElementById("err");
  const MensajeAct = document.getElementById("success");

  if (!descripcion.trim()) {
    mostrarMensaje("Ingrese la descripción", MensajeErr);
    return null;
  }

  const userSession = localStorage.getItem("USER_SESSION");
  const user_id = userSession ? JSON.parse(userSession).id : null;

  if (!user_id) {
    mostrarMensaje(
      "Sesión no válida. Por favor, inicie sesión nuevamente.",
      MensajeErr
    );
    return null;
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    let response: AxiosResponse<CampanaResponse>;

    const data = {
      descripcion,
      user_id,
    };

    if (id === 0) {
      response = await axios.post(`${linkBackend}/user/descripcion`, data, { headers });
    } else {
      response = await axios.patch(`${linkBackend}/user/descripcion/${id}`, data, {
        headers,
      });
    }
    mostrarMensaje(response.data.message, MensajeAct);
    return response;
  } catch (error: any) {
    console.error("Error en la solicitud:", error);
    mostrarMensaje(
      error.response?.data?.message || "Error al enviar los datos",
      MensajeErr
    );
    return null;
  }
};
