
export function getUserEmailFromToken(): string | null {
    try {
        const accessToken = localStorage.getItem("ACCESS_TOKEN");

        if (!accessToken) {
            throw new Error("No hay token disponible.");
        }
        const payloadBase64 = accessToken.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        return decodedPayload?.email || null;
    } catch (error) {
        console.error("Error obteniendo el email del token:", error);
        return null;
    }
}

export function getUserIdFromToken(): any | null {
    try {
        const accessToken = localStorage.getItem("ACCESS_TOKEN");

        if (!accessToken) {
            throw new Error("No hay token disponible.");
        }
        
        const payloadBase64 = accessToken.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        
        return decodedPayload?.id || null;
    } catch (error) {
        console.error("Error obteniendo el ID del token:", error);
        return null;
    }
}
