import { FormEvent, useState } from "react";
import { handleIntercambioSubmit } from "./handleSubmit";

function Handle(
  userOneId: number,
  userTwoId: number,
  nameChange: string,
  puntuacion: number,
  comentario: string,
  isUpdating: boolean,
  intercambioId?: number
) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitForm = async (event: FormEvent) => {
    setIsLoading(true);
    await handleIntercambioSubmit(
      event,
      userOneId,
      userTwoId,
      nameChange,
      puntuacion,
      comentario,
      isUpdating,
      intercambioId
    );

    setIsLoading(false);
  };

  return { handleSubmitForm, isLoading };
}

export default Handle;
