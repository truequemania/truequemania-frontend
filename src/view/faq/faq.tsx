
import { useEffect, useState } from "react";
import WhatsAppFloatingButton from "../../components/tsx/whatsapp";
import HeaderSesion from "../../components/home/headerSesion";
import Header from "../../components/home/header";
import Footer from "../../components/home/footer";

function Faq() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleQuestion = (index: any) => {
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
                        Preguntas Frecuentes
                    </h2>

                    <div className="space-y-6">
                        {[
                            {
                                question: "¿Cómo funciona el sistema de intercambio?",
                                answer:
                                    "El sistema de intercambio te permite ofrecer un producto y recibir otro a cambio. Puedes publicar tu artículo y negociar directamente con otros usuarios dentro de la plataforma.",
                            },
                            {
                                question: "¿Es seguro realizar intercambios?",
                                answer:
                                    "Sí, Truequemania cuenta con un sistema de verificación de usuarios y un sistema de calificaciones para asegurarte de realizar intercambios con personas confiables.",
                            },
                            {
                                question: "¿Cuánto cuesta usar la plataforma?",
                                answer:
                                    "El registro y la publicación de artículos son completamente gratuitos. Sin embargo, existen opciones premium para destacar tus productos y mejorar la visibilidad.",
                            },
                            {
                                question: "¿Puedo vender en lugar de intercambiar?",
                                answer:
                                    "Sí, puedes ofrecer tus productos en venta si no deseas realizar un intercambio. La plataforma permite ambas opciones para que tengas mayor flexibilidad.",
                            },
                            {
                                question: "¿Cómo contacto a otro usuario?",
                                answer:
                                    "Puedes comunicarte con otros usuarios a través del chat interno de la plataforma, donde podrás negociar los términos del intercambio o la venta de forma segura.",
                            },
                        ].map((faq, index) => (
                            <div key={index} className="bg-gray-700 p-4 rounded-lg">
                                <button
                                    className="flex justify-between items-center w-full text-left text-lg font-semibold text-orange-400"
                                    onClick={() => toggleQuestion(index)}
                                >
                                    {faq.question}
                                    <span className="text-gray-400">{openIndex === index ? "▲" : "▼"}</span>
                                </button>
                                {openIndex === index && (
                                    <p className="text-gray-400 mt-2">{faq.answer}</p>
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

export default Faq;