import { FormEvent, useState } from "react";
import { handleDescripcionSubmit } from "./handleSubmit";

function Handle(
    id:number,
    descripcion: string, 
) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitForm = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        const respuesta = await handleDescripcionSubmit(event, id, descripcion);

        if (respuesta?.data?.message) {
            window.location.reload();
        }

        setIsLoading(false);
    };

    return { handleSubmitForm, isLoading };

}

export default Handle;
