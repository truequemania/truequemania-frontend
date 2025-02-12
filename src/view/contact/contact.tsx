import { useEffect, useState } from "react";
import Header from "../../components/header";
import HeaderSesion from "../../components/headerSesion";
import WhatsAppFloatingButton from "../../components/tsx/whatsapp";
import Footer from "../../components/footer";

function Contact() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        setIsAuthenticated(!!token);
    }, []);

    return (
        <div className="font-quicksand">
            {isAuthenticated ? <HeaderSesion /> : <Header />}
            <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white min-h-screen flex justify-center items-center p-6">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl">
                    <h2 className="text-4xl font-bold text-center text-orange-400 mb-6">
                        Contáctanos
                    </h2>
                    <p className="text-gray-400 text-center mb-6">
                        Si tienes alguna consulta o sugerencia, no dudes en escribirnos. Te responderemos lo antes posible.
                    </p>

                    <form className="space-y-6">
                        
                        <div>
                            <label className="block text-gray-400 text-lg mb-2">Nombre</label>
                            <input
                                type="text"
                                placeholder="Tu nombre"
                                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-lg mb-2">Correo Electrónico</label>
                            <input
                                type="email"
                                placeholder="Tu correo electrónico"
                                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-lg mb-2">Mensaje</label>
                            <textarea
                                placeholder="Escribe tu mensaje aquí..."
                                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 h-32 resize-none"
                                required
                            ></textarea>
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-orange-400 hover:bg-orange-500 text-white text-lg font-semibold rounded-lg transition-all duration-300 shadow-md"
                            >
                                Enviar Mensaje
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <WhatsAppFloatingButton />
            <Footer />
        </div>
    );
}

export default Contact;
