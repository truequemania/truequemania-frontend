import { useEffect, useState } from "react";
import HeaderSesion from "../../components/home/headerSesion";
import Header from "../../components/home/header";
import WhatsAppFloatingButton from "../../components/tsx/whatsapp";
import Footer from "../../components/home/footer";

function ReturnsPolicy() {
    const [openIndex, setOpenIndex] = useState(null);

    const togglePolicy = (index: any) => {
        setOpenIndex(openIndex === index ? null : index);
    };

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
                        Políticas de Devolución
                    </h2>

                    <p className="text-gray-400 text-center mb-6">
                        En <span className="text-orange-400 font-semibold">Truequemania</span>, queremos garantizar que tengas la mejor experiencia. Aquí están nuestras políticas de devolución y reembolso.
                    </p>

                    <div className="space-y-6">
                        {[
                            {
                                title: "¿Puedo devolver un producto después del intercambio?",
                                content:
                                    "Las devoluciones dependen del acuerdo entre ambas partes. Recomendamos establecer términos claros antes de hacer el intercambio para evitar inconvenientes.",
                            },
                            {
                                title: "¿Cómo solicito una devolución?",
                                content:
                                    "Si realizaste una compra y necesitas devolver un artículo, puedes comunicarte con el vendedor dentro de los primeros 7 días y acordar un reembolso o cambio.",
                            },
                            {
                                title: "¿Quién cubre los costos de envío en una devolución?",
                                content:
                                    "Los costos de envío para devoluciones deben ser acordados entre el comprador y el vendedor. En algunos casos, el vendedor puede asumir el costo, pero es importante aclararlo antes de realizar la transacción.",
                            },
                            {
                                title: "¿Qué artículos no pueden devolverse?",
                                content:
                                    "Artículos de uso personal, productos digitales y artículos en oferta final no son elegibles para devolución. Consulta siempre las condiciones con el vendedor antes de la compra.",
                            },
                            {
                                title: "¿Puedo solicitar un reembolso?",
                                content:
                                    "Si el producto recibido no coincide con la descripción, puedes solicitar un reembolso dentro de los primeros 7 días tras la compra. Para ello, debes contactar al vendedor y acordar la solución.",
                            },
                        ].map((policy, index) => (
                            <div key={index} className="bg-gray-700 p-4 rounded-lg">
                                <button
                                    className="flex justify-between items-center w-full text-left text-lg font-semibold text-orange-400"
                                    onClick={() => togglePolicy(index)}
                                >
                                    {policy.title}
                                    <span className="text-gray-400">{openIndex === index ? "▲" : "▼"}</span>
                                </button>
                                {openIndex === index && (
                                    <p className="text-gray-400 mt-2">{policy.content}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <WhatsAppFloatingButton />
            <Footer />
        </div>
    );
}

export default ReturnsPolicy;
