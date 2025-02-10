import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface User {
  email: string;
  role: "client" | "admin"; 
}

export const AuthGuard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isRedirected, setIsRedirected] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");

    if (!accessToken) {
      navigate("/login");
      return;
    }

    try {
      // Extraer y decodificar el payload del JWT
      const payloadBase64 = accessToken.split(".")[1];
      const decodedPayload: User = JSON.parse(atob(payloadBase64));

      console.log("Decoded Token Payload:", decodedPayload); // 📌 Ver todo el payload
      console.log("User Role:", decodedPayload.role); // 📌 Ver el role

      setUser(decodedPayload);
    } catch (error) {
      console.error("Error decodificando el token:", error);
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (user && !isRedirected) {
      const redirectRoutes: Record<string, string> = {
        "client": "/explorar",
        "admin": "/categoriasUser",
      };

      if (user.role) {
        console.log("Redirecting user with role:", user.role); // 📌 Ver el role antes de redirigir
      }

      if (user.role && redirectRoutes[user.role]) {
        setIsRedirected(true);
        navigate(redirectRoutes[user.role]);
      }
    }
  }, [user, isRedirected, navigate]);

  return <></>;
};

export default AuthGuard;
