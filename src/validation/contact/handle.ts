import { useState, FormEvent } from "react";
import { Submit} from "./submit";

export function Handle(
    name: string,
    email: string,
    message: string,
    setName: (value: string) => void,
    setEmail: (value: string) => void,
    setMessage: (value: string) => void
) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        const success = await Submit(event, name, email, message);

        setIsLoading(false);

        if (success) {
            setName("");
            setEmail("");
            setMessage("");
        }
    };

    return { handleSubmit, isLoading };
}



