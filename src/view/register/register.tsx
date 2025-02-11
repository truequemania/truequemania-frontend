import ButtonUser from "../../components/register/buttonUser";
import EmailUser from "../../components/register/emailUser";
import Message from "../../components/tsx/message";
import NameUser from "../../components/register/nameUser";
import PasswordUser from "../../components/register/passwordUser";
import User from "../../validation/register/user";
import authRedirectToken from "../../components/ts/autRedirectToken";
import Handle from "../../validation/register/handle";

function Register() {

    const { name, setName, email, setEmail, password, setPassword, showPassword,
        togglePasswordVisibility,
    } = User();

    authRedirectToken("/explorar");
    
    const { handleSubmit, isLoading } = Handle(
        name,
        email,
        password
    );

    return (
        <div className="font-quicksand flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-extrabold text-white text-center mb-6">
                    Crea tu Cuenta
                </h2>
                <Message />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <NameUser
                        name={name}
                        setName={setName}
                    />
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
                    <ButtonUser
                        isLoading={isLoading}
                    />
                </form>

                <p className="text-gray-400 text-sm text-center mt-6">
                    ¿Ya tienes una cuenta?{" "}
                    <a href="/login" className="text-orange-400 hover:text-yellow-400 transition">
                        Inicia sesión
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

export default Register;
