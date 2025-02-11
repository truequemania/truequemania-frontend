import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/img/logo.png";
import userIcon from "../assets/img/user.png"; 

function HeaderSesion() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    return (
        <header className="font-quicksand bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-md text-white">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4 relative">

                <Link to="/" className="flex items-center space-x-2">
                    <img src={logo} alt="Logo" className="h-12 w-12 rounded-full border border-white" />
                    <span className="text-xl font-bold">Truequemania</span>
                </Link>

                <div className="hidden md:flex items-center relative">
                    <button
                        className="flex items-center space-x-2 focus:outline-none"
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                    >
                        <img src={userIcon} alt="User" className="h-10 w-10 rounded-full border border-gray-300" />
                        <span className="text-gray-400 text-sm">▼</span>
                    </button>

                    {userMenuOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-50">
                            <Link to="/profile" className="block px-4 py-2 text-gray-200 hover:bg-gray-700">Perfil</Link>
                            <Link to="/settings" className="block px-4 py-2 text-gray-200 hover:bg-gray-700">Configuración</Link>
                            <Link to="/logout" className="block px-4 py-2 text-gray-200 hover:bg-gray-700">Cerrar Sesión</Link>
                        </div>
                    )}
                </div>

                <button
                    className="md:hidden focus:outline-none text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? "✖" : "☰"}
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-gray-800 text-white space-y-4 p-4">
                    <div className="flex items-center space-x-2">
                        <img src={userIcon} alt="User" className="h-10 w-10 rounded-full border border-gray-300" />
                        <span className="text-gray-300">Mi Cuenta</span>
                    </div>
                    <Link to="/profile" className="block hover:text-gray-400">Perfil</Link>
                    <Link to="/settings" className="block hover:text-gray-400">Configuración</Link>
                    <Link to="/logout" className="block hover:text-gray-400">Cerrar Sesión</Link>
                </div>
            )}
        </header>
    );
}

export default HeaderSesion;
