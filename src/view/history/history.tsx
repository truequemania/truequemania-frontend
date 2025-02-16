import { useEffect, useState } from "react";
import Header from "../../components/home/header";
import HeaderSesion from "../../components/home/headerSesion";
import WhatsAppFloatingButton from "../../components/tsx/whatsapp";
import Footer from "../../components/home/footer";

function History() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        setIsAuthenticated(!!token);
    }, []);

    return (
        <div className="font-quicksand">
            {isAuthenticated ? <HeaderSesion /> : <Header />}

            <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white min-h-screen p-8 flex justify-center">
                <div className="max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-center text-orange-400 mb-6">Nuestra Historia</h1>

                    <div className="space-y-6">
                        <p className="text-lg text-gray-400">
                            Todo comenzó con <span className="text-orange-400 font-semibold">Gustavo Vava</span>, un visionario que observó una gran oportunidad en Chile.
                            Se dio cuenta de que, aunque muchas personas compraban en línea, aún existía una necesidad insatisfecha: la posibilidad de <span className="text-orange-400 font-semibold">intercambiar productos</span> de forma segura y sencilla.
                        </p>

                        <p className="text-lg text-gray-400">
                            Inspirado por la economía colaborativa y la tradición de los intercambios, Gustavo decidió crear <span className="text-orange-400 font-semibold">Truequemania</span>,
                            una plataforma donde cualquier persona puede no solo comprar, sino también <span className="text-orange-400 font-semibold">intercambiar artículos, negociar y conectar</span> con otras personas de manera confiable.
                        </p>

                        <p className="text-lg text-gray-400">
                            Con un diseño intuitivo, un sistema de seguridad avanzado y una comunidad en constante crecimiento,
                            <span className="text-orange-400 font-semibold"> Truequemania</span> ha revolucionado la forma en que los chilenos acceden a bienes y servicios.
                            Desde tecnología hasta ropa, pasando por muebles y herramientas, la plataforma se ha convertido en el punto de encuentro ideal para los amantes del intercambio.
                        </p>

                        <p className="text-lg text-gray-400">
                            Hoy, seguimos evolucionando con nuevas funciones, más categorías y una red de usuarios en constante expansión.
                            En <span className="text-orange-400 font-semibold">Truequemania</span>, creemos en una economía más accesible y en el poder de la comunidad para generar oportunidades.
                        </p>

                        <p className="text-lg text-orange-400 font-semibold text-center">
                            ¡Únete a la revolución del intercambio y sé parte de nuestra historia!
                        </p>
                    </div>
                </div>
            </div>

            <WhatsAppFloatingButton />
            <Footer />
        </div>
    );
}

export default History;
