import { FormEvent } from "react";
import axios, { AxiosResponse } from "axios";
import { mostrarMensaje } from "../../components/tsx/toast";
import { linkBackend } from "../../components/ts/urls";

const token = localStorage.getItem("ACCESS_TOKEN");

interface CampanaResponse {
  message: string;
}

export const handleIntercambioSubmit = async (
  event: FormEvent,
  userOneId: number,
  userTwoId: number,
  nameChange: string,
  puntuacion: number | null,
  comentario: string | null,
  isUpdating: boolean,
  intercambioId?: number
): Promise<AxiosResponse<CampanaResponse> | null> => {
  event.preventDefault();
  const MensajeErr = document.getElementById("err");

  const userSession = localStorage.getItem("USER_SESSION");
  const userId = userSession ? JSON.parse(userSession).id : null;

  if (!userId) {
    mostrarMensaje("Usuario no autenticado", MensajeErr);
    return null;
  }

  if (!nameChange) {
    mostrarMensaje("Ingrese el nombre del intercambio", MensajeErr);
    return null;
  }

  if (isUpdating && (!puntuacion || !comentario)) {
    mostrarMensaje(
      "Ingrese la puntuación y el comentario para actualizar",
      MensajeErr
    );
    return null;
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const data = isUpdating
      ? {
          userOneId,
          userTwoId,
          puntuacionTwoId: puntuacion,
          comentarioTwoId: comentario,
          estatus: true,
        }
      : {
          userOneId,
          userTwoId,
          nameChange,
          puntucacionOneId: puntuacion,
          comentarioOneId: comentario,
          userCreate: userId,
          estatus: false,
        };

    const url = isUpdating
      ? `${linkBackend}/intercambios/${intercambioId}`
      : `${linkBackend}/intercambios`;

    const method = isUpdating ? "patch" : "post";

    const response = await axios({
      url,
      method,
      data,
      headers,
    });

    alert(response.data.message);

    if (isUpdating) {
      window.location.href = "/intercambios";
    } else {
      window.location.reload();
    }

    return response;
  } catch (error: any) {
    console.error("Error en la solicitud:", error);
    alert(error.response?.data?.message);
    return null;
  }
};
