import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/img/logo.png";
import userIcon from "../../assets/img/user.png";
import { Modal } from "../tsx/toast";
import authRedirectNoToken from "../ts/autRedirectNoToken";
import { Bell, ShoppingCart } from "lucide-react"; 
import roleAdmin from "../ts/roleAdmin";

function HeaderSesion() {
    authRedirectNoToken("/login");
    
    const navigate = useNavigate();
  
    useEffect(() => {
      roleAdmin(navigate);
    }, [navigate]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [notifications, setNotifications] = useState(3); 
    const [cartItems, setCartItems] = useState(2); 
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

                <Link to="/" className="flex items-center space-x-2">
                    <img src={logo} alt="Logo" className="h-12 w-12 rounded-full border border-white" />
                    <span className="text-xl font-bold">Truequemania</span>
                </Link>

                <div className="flex items-center space-x-6">
                    
                    <div className="relative cursor-pointer">
                        <Bell className="w-7 h-7 text-gray-300 hover:text-white" />
                        {notifications > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2">
                                {notifications}
                            </span>
                        )}
                    </div>

                    <div className="relative cursor-pointer">
                        <ShoppingCart className="w-7 h-7 text-gray-300 hover:text-white" />
                        {cartItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full px-2">
                                {cartItems}
                            </span>
                        )}
                    </div>

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
                                <Link to="/profile" className=" block px-4 py-2 text-white hover:bg-gray-200 hover:text-gray-800 rounded-lg">Perfil</Link>
                                <Link to="/article" className="block px-4 py-2 text-white hover:bg-gray-200 hover:text-gray-800 rounded-lg">Administración</Link>
                                <button onClick={showModal} className=" rounded-lg block w-full text-left px-4 py-2 text-orange-400 hover:bg-orange-400 hover:text-white">Cerrar Sesión</button>
                            </div>
                        )}
                    </div>
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
                        <span className="text-gray-300">Mi cuenta</span>
                    </div>
                    <Link to="/profile" className="block hover:text-gray-400">perfil</Link>
                    <Link to="/article" className="block hover:text-gray-400">Administración</Link>
                    <button onClick={showModal} className="block hover:text-gray-400">Cerrar Sesión</button>
                </div>
            )}

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
