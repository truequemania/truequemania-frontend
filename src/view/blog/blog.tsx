import { useEffect, useState } from "react";
import HeaderSesion from "../../components/headerSesion";
import Header from "../../components/header";
import WhatsAppFloatingButton from "../../components/tsx/whatsapp";
import Footer from "../../components/footer";

function Blog() {
    const [expandedArticle, setExpandedArticle] = useState(null);

    const toggleArticle = (index: any) => {
        setExpandedArticle(expandedArticle === index ? null : index);
    };

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        setIsAuthenticated(!!token);
    }, []);

    return (
        <div className="font-quicksand">
            {isAuthenticated ? <HeaderSesion /> : <Header />}
            <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white min-h-screen p-8">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl font-bold text-center text-orange-400 mb-6">
                        Blog de Intercambio y Ventas
                    </h1>

                    <p className="text-lg text-gray-400 text-center mb-8">
                        Descubre las mejores estrategias para intercambiar y vender productos de forma segura y eficiente.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "¿Por qué el intercambio de productos es el futuro?",
                                preview: "En un mundo donde el consumo consciente es clave, el intercambio de productos se está convirtiendo en una opción popular...",
                                fullText: "Cada vez más personas están optando por el intercambio de productos en lugar de comprar nuevos. Esto no solo reduce el desperdicio, sino que también permite ahorrar dinero y acceder a bienes que de otra forma serían inaccesibles. Además, plataformas como Truequemania hacen que este proceso sea seguro y fácil, conectando a personas con intereses similares.",
                            },
                            {
                                title: "Guía para vender en línea con éxito",
                                preview: "¿Quieres vender más rápido? Aprende cómo hacer descripciones atractivas, fijar precios competitivos y utilizar imágenes de calidad...",
                                fullText: "Para vender con éxito en línea, es fundamental tener fotos de buena calidad, descripciones detalladas y un precio justo. También es importante responder rápido a los compradores y ofrecer opciones de entrega seguras. Truequemania te permite hacer todo esto con facilidad, conectándote con una audiencia interesada en productos de segunda mano e intercambios.",
                            },
                            {
                                title: "Los 5 errores más comunes al intercambiar productos",
                                preview: "Muchas personas cometen errores al intercambiar productos, como no verificar la calidad o no conocer el valor real del artículo...",
                                fullText: "1. No revisar el estado del producto antes del intercambio.\n2. No investigar el valor real del artículo antes de hacer el trato.\n3. No definir bien los términos del intercambio (envío, entrega, etc.).\n4. No usar una plataforma segura como Truequemania para coordinar el proceso.\n5. No pedir referencias o historial de intercambios de la otra persona.",
                            },
                            {
                                title: "¿Qué productos son los más intercambiados en Chile?",
                                preview: "En Truequemania, los usuarios han descubierto que ciertos productos tienen una gran demanda en los intercambios...",
                                fullText: "Los productos más intercambiados en Chile incluyen tecnología (celulares, laptops, consolas de videojuegos), ropa de marca, electrodomésticos pequeños y herramientas. También hay alta demanda por bicicletas, artículos de cocina y juguetes para niños. Al publicar en Truequemania, asegúrate de agregar buenas fotos y una descripción clara del estado del producto.",
                            }
                        ].map((article, index) => (
                            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                <h2 className="text-2xl font-semibold text-orange-400 mb-4">
                                    {article.title}
                                </h2>
                                <p className="text-gray-400 mb-4">
                                    {expandedArticle === index ? article.fullText : article.preview}
                                </p>
                                <button
                                    className="mt-2 px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500"
                                    onClick={() => toggleArticle(index)}
                                >
                                    {expandedArticle === index ? "Leer menos" : "Leer más"}
                                </button>
                            </div>
                        ))}
                    </div>

                    <p className="text-lg text-center text-gray-400 mt-10">
                        ¿Quieres estar al día con las últimas tendencias en intercambio y ventas? <span className="text-orange-400 font-semibold">Sigue nuestro blog</span> y conviértete en un experto en el mundo del trueque.
                    </p>
                </div>
            </div>
            <WhatsAppFloatingButton />
            <Footer />
        </div>
    );
}

export default Blog;
