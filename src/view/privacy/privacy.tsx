
import { useEffect, useState } from "react";
import HeaderSesion from "../../components/headerSesion";
import Header from "../../components/header";
import WhatsAppFloatingButton from "../../components/tsx/whatsapp";
import Footer from "../../components/footer";

function PrivacyPolicy() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleSection = (index: any) => {
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
                        Políticas de Privacidad
                    </h2>

                    <p className="text-gray-400 text-center mb-6">
                        En <span className="text-orange-400 font-semibold">Truequemania</span>, valoramos tu privacidad y estamos comprometidos con la protección de tus datos personales.
                    </p>

                    <div className="space-y-6">
                        {[
                            {
                                title: "1. Información que recopilamos",
                                content:
                                    "Recopilamos información personal como nombre, correo electrónico y datos de contacto cuando te registras en nuestra plataforma. También recopilamos datos de uso y preferencias.",
                            },
                            {
                                title: "2. Cómo utilizamos tu información",
                                content:
                                    "Usamos tu información para brindarte una mejor experiencia en la plataforma, mejorar nuestros servicios y personalizar las recomendaciones de productos.",
                            },
                            {
                                title: "3. Compartición de datos",
                                content:
                                    "No vendemos ni compartimos tu información con terceros sin tu consentimiento. Solo compartimos datos cuando es necesario para completar transacciones o cumplir con regulaciones legales.",
                            },
                            {
                                title: "4. Seguridad de tu información",
                                content:
                                    "Implementamos medidas de seguridad para proteger tus datos contra accesos no autorizados, pérdidas o alteraciones.",
                            },
                            {
                                title: "5. Cookies y tecnologías de seguimiento",
                                content:
                                    "Utilizamos cookies y tecnologías similares para mejorar la experiencia del usuario, analizar el tráfico y personalizar contenido.",
                            },
                            {
                                title: "6. Derechos del usuario",
                                content:
                                    "Tienes derecho a acceder, corregir o eliminar tu información personal. También puedes gestionar las preferencias de privacidad desde tu cuenta.",
                            },
                            {
                                title: "7. Conservación de datos",
                                content:
                                    "Guardamos tu información durante el tiempo necesario para brindarte nuestros servicios o según lo exija la ley.",
                            },
                            {
                                title: "8. Cambios en esta política",
                                content:
                                    "Podemos actualizar nuestra política de privacidad en cualquier momento. Te notificaremos sobre cambios importantes mediante correo electrónico o en la plataforma.",
                            },
                            {
                                title: "9. Contacto",
                                content:
                                    "Si tienes preguntas sobre nuestra política de privacidad, puedes contactarnos en soporte@truequemania.com.",
                            },
                        ].map((section, index) => (
                            <div key={index} className="bg-gray-700 p-4 rounded-lg">
                                <button
                                    className="flex justify-between items-center w-full text-left text-lg font-semibold text-orange-400"
                                    onClick={() => toggleSection(index)}
                                >
                                    {section.title}
                                    <span className="text-gray-400">{openIndex === index ? "▲" : "▼"}</span>
                                </button>
                                {openIndex === index && (
                                    <p className="text-gray-400 mt-2">{section.content}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    <p className="text-gray-400 text-center mt-6">
                        Si tienes dudas sobre nuestra política de privacidad, contáctanos en <span className="text-orange-400 font-semibold">soporte@truequemania.com</span>.
                    </p>
                </div>
            </div>
            <WhatsAppFloatingButton />
            <Footer />
        </div>
    );
}

export default PrivacyPolicy;
