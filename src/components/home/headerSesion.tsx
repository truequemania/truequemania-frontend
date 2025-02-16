import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/img/logo.png";
import userIcon from "../../assets/img/user.png";
import { Modal } from "../tsx/toast";
import authRedirectNoToken from "../ts/autRedirectNoToken";
import { Bell, ShoppingCart } from "lucide-react"; // Importamos iconos

function HeaderSesion() {
    const navigate = useNavigate();
    authRedirectNoToken("/login");

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [notifications, setNotifications] = useState(3); // Simulación de notificaciones
    const [cartItems, setCartItems] = useState(2); // Simulación de productos en carrito

    const showModal = () => setIsModalVisible(!isModalVisible);

    useEffect(() => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        setIsLogged(!!token);
    }, []);

    const logOut = () => {
        localStorage.removeItem("ACCESS_TOKEN");
        setIsLogged(false);
        navigate("/");
    };

    return (
        <header className="font-quicksand bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-md text-white">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4 relative">

                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <img src={logo} alt="Logo" className="h-12 w-12 rounded-full border border-white" />
                    <span className="text-xl font-bold">Truequemania</span>
                </Link>

                {/* Iconos de Notificación y Carrito (Ahora visibles en móviles y desktop) */}
                <div className="flex items-center space-x-6">
                    
                    {/* Icono de Notificaciones */}
                    <div className="relative cursor-pointer">
                        <Bell className="w-7 h-7 text-gray-300 hover:text-white" />
                        {notifications > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2">
                                {notifications}
                            </span>
                        )}
                    </div>

                    {/* Icono del Carrito */}
                    <div className="relative cursor-pointer">
                        <ShoppingCart className="w-7 h-7 text-gray-300 hover:text-white" />
                        {cartItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full px-2">
                                {cartItems}
                            </span>
                        )}
                    </div>

                    {/* Menú de Usuario (Visible en Desktop) */}
                    <div className="hidden md:flex">
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
                                <Link to="/article" className="block px-4 py-2 text-gray-200 hover:bg-gray-700">Administración</Link>
                                <button onClick={showModal} className="block w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700">Cerrar Sesión</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Menú móvil (Botón de hamburguesa) */}
                <button
                    className="md:hidden focus:outline-none text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? "✖" : "☰"}
                </button>
            </div>

            {/* Menú móvil desplegable */}
            {menuOpen && (
                <div className="md:hidden bg-gray-800 text-white space-y-4 p-4">
                    

                    <div className="flex items-center space-x-2">
                        <img src={userIcon} alt="User" className="h-10 w-10 rounded-full border border-gray-300" />
                        <span className="text-gray-300">Mi Cuenta</span>
                    </div>
                    <Link to="/profile" className="block hover:text-gray-400">Perfil</Link>
                    <Link to="/article" className="block hover:text-gray-400">Configuración</Link>
                    <button onClick={showModal} className="block hover:text-gray-400">Cerrar Sesión</button>
                </div>
            )}

            {/* Modal de Cerrar Sesión */}
            <Modal
                onConfirm={() => {
                    logOut();
                    showModal();
                }}
                isVisible={isModalVisible}
                onClose={showModal}
                message="¿Estás seguro de cerrar sesión?"
            />
        </header>
    );
}

export default HeaderSesion;
