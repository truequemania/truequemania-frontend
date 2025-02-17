import { useState } from "react";
import userIcon from "../../assets/img/user.png";

interface SidebarProps {
    isAsideOpen: boolean;
    handleNavigation: (path: string) => void;
    navLinks: { path: string; label: string }[];
    showModal: () => void;
}

const SidebarUser = ({
    isAsideOpen,
    handleNavigation,
    navLinks,
    showModal
}: SidebarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <aside
            id="logo-sidebar"
            className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isAsideOpen ? "translate-x-0" : "-translate-x-full"
                } border-r bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-md`}
            aria-label="Sidebar"
        >
            <div className="h-full px-3 pb-4 overflow-y-auto flex flex-col justify-between bg-gradient-to-r from-gray-900 via-black to-gray-900">
                <ul className="space-y-2 font-medium">
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <button
                                onClick={() => handleNavigation(link.path)}
                                className="transition duration-300 transform hover:scale-105 flex items-center p-2 text-white rounded-lg bg-gray-800 hover:bg-gray-500 w-full text-left"
                            >
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    {link.label}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="mt-auto relative">
                    <button
                        onClick={toggleMenu}
                        className="flex items-center w-full p-2 text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition duration-300"
                    >
                        <img src={userIcon} alt="User" className="w-8 h-8 rounded-full mr-2" />
                        <span className="flex-1 text-left">Mi Cuenta</span>
                    </button>

                    {isMenuOpen && (
                        <div className=" absolute bottom-12 left-0 w-full bg-gray-800 rounded-lg shadow-lg">
                            <button
                                onClick={() => handleNavigation("/perfil")}
                                className="block w-full text-left px-4 py-2 text-white hover:bg-gray-200 hover:text-gray-800 rounded-lg "
                            >
                                Perfil
                            </button>
                            <button
                                onClick={() => handleNavigation("/")}
                                className="block w-full text-left px-4 py-2 text-white hover:bg-gray-200 hover:text-gray-800 rounded-lg "
                            >
                                Explorar
                            </button>
                            <button
                                onClick={showModal}
                                className="block w-full text-left px-4 py-2 text-orange-500 hover:bg-orange-400 rounded-lg hover:text-white"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default SidebarUser;
