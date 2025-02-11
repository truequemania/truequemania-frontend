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
      const payloadBase64 = accessToken.split(".")[1];
      const decodedPayload: User = JSON.parse(atob(payloadBase64));

      setUser(decodedPayload);
    } catch (error) {
      console.error("Error decodificando el token:", error);
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (user && !isRedirected) {
      const redirectRoutes: Record<string, string> = {
        "client": "/",
        "admin": "/categoriasUser",
      };

      if (user.role && redirectRoutes[user.role]) {
        setIsRedirected(true);
        navigate(redirectRoutes[user.role]);
      }
    }
  }, [user, isRedirected, navigate]);

  return <></>;
};

export default AuthGuard;
