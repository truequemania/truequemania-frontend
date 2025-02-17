import { Link} from "react-router-dom";
import { useState } from "react";
import { Bell, ShoppingCart } from "lucide-react";
import logoImage from "../../assets/img/logo.png";

interface NavBarProps {
    toggleAside: () => void;
}

function NavBarUser({ toggleAside }: NavBarProps) {

    const [notifications, setNotifications] = useState(3);
    const [cartItems, setCartItems] = useState(2);

    return (
        <nav className="fixed top-0 z-50 w-full border-b shadow-md bg-gradient-to-r from-gray-900 via-black to-gray-900">
            <div className="px-3 py-3 lg:px-5 lg:pl-3 flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        onClick={toggleAside}
                        aria-controls="logo-sidebar"
                        type="button"
                        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-200 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        <span className="sr-only">Open sidebar</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>
                    </button>
                    <Link to="/" className="ml-2">
                        <img src={logoImage} className="h-12 rounded-full bg-white" alt="Logo" />
                    </Link>
                </div>
                
                <div className="flex items-center space-x-6">
                    <div className="relative cursor-pointer">
                        <Bell className="w-7 h-7 text-gray-300 hover:text-white" />
                        {notifications > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2">{notifications}</span>
                        )}
                    </div>
                    
                    <div className="relative cursor-pointer">
                        <ShoppingCart className="w-7 h-7 text-gray-300 hover:text-white" />
                        {cartItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full px-2">{cartItems}</span>
                        )}
                    </div>
                </div>

            </div>
        </nav>
    );
}

export default NavBarUser;
