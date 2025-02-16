import { useEffect, useState } from "react";
import WhatsAppFloatingButton from "../../components/tsx/whatsapp";
import HeaderSesion from "../../components/home/headerSesion";
import Header from "../../components/home/header";
import Footer from "../../components/home/footer";

function TermsAndConditions() {
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
                        Términos y Condiciones
                    </h2>

                    <p className="text-gray-400 text-center mb-6">
                        Bienvenido a <span className="text-orange-400 font-semibold">Truequemania</span>. Antes de utilizar nuestros servicios, te recomendamos leer nuestros términos y condiciones.
                    </p>

                    <div className="space-y-6">
                        {[
                            {
                                title: "1. Aceptación de los términos",
                                content:
                                    "Al utilizar Truequemania, aceptas cumplir con nuestros términos y condiciones. Si no estás de acuerdo, por favor no uses la plataforma.",
                            },
                            {
                                title: "2. Registro y Seguridad",
                                content:
                                    "Para utilizar ciertos servicios, debes registrarte con un correo electrónico válido. Eres responsable de la seguridad de tu cuenta y contraseña.",
                            },
                            {
                                title: "3. Uso de la plataforma",
                                content:
                                    "Truequemania es una plataforma de compra, venta e intercambio de productos. No nos hacemos responsables de los acuerdos entre los usuarios, pero promovemos prácticas seguras.",
                            },
                            {
                                title: "4. Publicación de contenido",
                                content:
                                    "No está permitido publicar contenido ilegal, ofensivo o que infrinja derechos de terceros. Nos reservamos el derecho de eliminar contenido sin previo aviso.",
                            },
                            {
                                title: "5. Métodos de Pago",
                                content:
                                    "Los pagos en Truequemania pueden realizarse a través de tarjetas de crédito/débito, PayPal y transferencia bancaria. Cada usuario debe verificar la seguridad de la transacción.",
                            },
                            {
                                title: "6. Política de devoluciones",
                                content:
                                    "Los intercambios y compras son responsabilidad de los usuarios. Sin embargo, promovemos políticas de devolución justas y acuerdos entre ambas partes.",
                            },
                            {
                                title: "7. Suspensión de cuenta",
                                content:
                                    "Nos reservamos el derecho de suspender o eliminar cuentas que violen nuestras políticas o participen en actividades fraudulentas.",
                            },
                            {
                                title: "8. Privacidad y protección de datos",
                                content:
                                    "Respetamos tu privacidad y protegemos tus datos personales de acuerdo con nuestras políticas de privacidad. No compartimos información sin consentimiento.",
                            },
                            {
                                title: "9. Modificaciones en los términos",
                                content:
                                    "Podemos modificar estos términos en cualquier momento. Se notificará a los usuarios sobre cambios importantes en la plataforma.",
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
                        Si tienes dudas, consulta nuestro <a href="/contact"><span className="text-orange-400 font-semibold">contáctanos</span></a>.
                    </p>
                </div>
            </div>
            <WhatsAppFloatingButton />
            <Footer />
        </div>
    );
}

export default TermsAndConditions;
