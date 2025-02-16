
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import authRedirectToken from "../../components/ts/autRedirectToken";
import VerificationUrls from "../../validation/login/verificationUrls";
import Handle from "../../validation/login/handle";
import Message from "../../components/tsx/message";
import EmailUser from "../../components/login/emailUser";
import PasswordUser from "../../components/login/passwordUser";
import ButtonUser from "../../components/login/buttonUser";
import User from "../../validation/login/user";

function Login() {

    authRedirectToken("/");

    const { email, setEmail, password, setPassword, showPassword, togglePasswordVisibility } = User();

    const navigate = useNavigate();
    const tokens = new URLSearchParams(window.location.search).get("token");

    useEffect(() => {
        const verify = async () => {
            await VerificationUrls(tokens, navigate);
        };
        verify();
    }, [tokens, navigate]);

    const { handleSubmit, isLoading } = Handle(email, password);

    return (
        <div className="font-quicksand flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-extrabold text-white text-center mb-6">
                    Inicia Sesión
                </h2>
                <Message />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <EmailUser
                        email={email}
                        setEmail={setEmail}
                    />

                    <PasswordUser
                        password={password}
                        setPassword={setPassword}
                        showPassword={showPassword}
                        togglePasswordVisibility={togglePasswordVisibility}
                    />

                    <div className="flex justify-between items-center">
                        <div>
                            <a href="/email" className="text-orange-400 hover:text-yellow-400 transition">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </div>

                    <ButtonUser
                        isLoading={isLoading}
                    />
                </form>

                <p className="text-gray-400 text-sm text-center mt-6">
                    ¿No tienes cuenta?{" "}
                    <a href="/register" className="text-orange-400 hover:text-yellow-400 transition">
                        Regístrate aquí
                    </a>
                </p>
                <p className="text-gray-400 text-sm text-center mt-6">
                    <a href="/" className="text-orange-400 hover:text-yellow-400 transition">
                       Volver a inicio
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;
