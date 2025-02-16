import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/img/logo.png";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="font-quicksand bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-md text-white">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">

                <Link to="/" className="flex items-center space-x-2">
                    <img src={logo} alt="Logo" className="h-12 w-12 rounded-full border border-white" />
                    <span className="text-xl font-bold">Truequemania</span>
                </Link>

                <div className="hidden md:block">
                    <Link to="/login" className="px-4 py-2 bg-orange-400 hover:bg-orange-500 rounded-lg text-white">
                        Empezar
                    </Link>
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
                    <Link to="/login" className="block bg-orange-400 hover:bg-orange-500 text-center py-2 rounded-lg">
                        Empezar
                    </Link>
                </div>
            )}
        </header>
    );
}

export default Header;
