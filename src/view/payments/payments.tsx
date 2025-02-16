import { useEffect, useState } from "react";
import visa from "../../assets/img/visa.png";
import mastercard from "../../assets/img/mastercard.png";
import paypal from "../../assets/img/paypal.png";
import WhatsAppFloatingButton from "../../components/tsx/whatsapp";
import HeaderSesion from "../../components/home/headerSesion";
import Header from "../../components/home/header";
import Footer from "../../components/home/footer";

function PaymentMethods() {
    const [openIndex, setOpenIndex] = useState(null);

    const togglePaymentInfo = (index: any) => {
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
                        Métodos de Pago
                    </h2>

                    <p className="text-gray-400 text-center mb-6">
                        En <span className="text-orange-400 font-semibold">Truequemania</span>, ofrecemos varias opciones de pago seguras para tu comodidad.
                    </p>

                    <div className="space-y-6">
                        {[
                            {
                                title: "Tarjetas de Crédito/Débito",
                                content:
                                    "Aceptamos tarjetas Visa y Mastercard. Los pagos son procesados de forma segura y puedes guardar tus datos para futuras compras.",
                                icon: visa,
                            },
                            {
                                title: "PayPal",
                                content:
                                    "Puedes pagar de forma segura con PayPal, utilizando tu saldo o vinculando tu tarjeta de crédito o débito.",
                                icon: paypal,
                            },
                            {
                                title: "Pagos en efectivo",
                                content:
                                    "Algunos vendedores permiten pagos en efectivo en el momento de la entrega. Asegúrate de verificar esta opción antes de confirmar la compra.",
                                icon: mastercard,
                            },
                        ].map((payment, index) => (
                            <div key={index} className="bg-gray-700 p-4 rounded-lg">
                                <button
                                    className="flex justify-between items-center w-full text-left text-lg font-semibold text-orange-400"
                                    onClick={() => togglePaymentInfo(index)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <img src={payment.icon} alt="Payment Icon" className="h-8 w-12 rounded-md" />
                                        <span>{payment.title}</span>
                                    </div>
                                    <span className="text-gray-400">{openIndex === index ? "▲" : "▼"}</span>
                                </button>
                                {openIndex === index && (
                                    <p className="text-gray-400 mt-2">{payment.content}</p>
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

export default PaymentMethods;
