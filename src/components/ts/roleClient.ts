interface User {
  email: string;
  role: "client" | "admin";
}

const roleClient = (navigate: (path: string) => void) => {
  const accessToken = localStorage.getItem("ACCESS_TOKEN");

  if (!accessToken) {
    console.error("No se encontró el token en localStorage");
    return;
  }

  try {
    const payloadBase64 = accessToken.split(".")[1];
    const decodedPayload: User = JSON.parse(atob(payloadBase64));

    if (decodedPayload.role === "client") {
      navigate("/explorar");
    }
  } catch (error) {
    console.error("Error al decodificar el token:", error);
  }
};

export default roleClient;
