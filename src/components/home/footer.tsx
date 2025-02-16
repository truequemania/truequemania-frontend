import logo from '../../assets/img/logo.png';
import paypal from '../../assets/img/paypal.png';
import visa from '../../assets/img/visa.png';
import mastercard from '../../assets/img/mastercard.png';
import appStore from '../../assets/img/appstore.png';
import googlePlay from '../../assets/img/playstore.png';
import { useState } from 'react';
import { HandleSuscribe } from '../../validation/suscribe/handle';

function Footer() {

    const [email, setEmail] = useState("");

    const { handleSubmitSuscribe, isLoading } = HandleSuscribe(
        email,
        setEmail
    );

    return (
        <footer className="font-quicksand bg-gray-900 text-white">
            <div className="mx-auto w-full max-w-screen-xl p-6 lg:py-10">

                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Logo" className="h-14 w-14 rounded-full border border-white" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Sobre Nosotros</h2>
                        <ul className="text-gray-400">
                            <li><a href="/history" className="hover:underline hover:text-gray-500">Nuestra historia</a></li>
                            <li><a href="/blog" className="hover:underline hover:text-gray-500">Blog</a></li>
                            <li><a href="/contact" className="hover:underline hover:text-gray-500">Contacto</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Categorías</h2>
                        <ul className="text-gray-400">
                            <li><a href="/" className="hover:underline hover:text-gray-500">Ofertas Especiales</a></li>
                            <li><a href="/" className="hover:underline hover:text-gray-500">Nuevos Productos</a></li>
                            <li><a href="/" className="hover:underline hover:text-gray-500">Más Vendidos</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Atención al Cliente</h2>
                        <ul className="text-gray-400">
                            <li><a href="/faq" className="hover:underline hover:text-gray-500">Preguntas Frecuentes</a></li>
                            <li><a href="/returns" className="hover:underline hover:text-gray-500">Devoluciones</a></li>
                            <li><a href="/payments" className="hover:underline hover:text-gray-500">Métodos de Pago</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Legal</h2>
                        <ul className="text-gray-400">
                            <li><a href="/terms" className="hover:underline hover:text-gray-500">Términos y Condiciones</a></li>
                            <li><a href="/privacy" className="hover:underline hover:text-gray-500">Política de Privacidad</a></li>
                        </ul>
                    </div>
                </div>

                <hr className="my-6 border-gray-700" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Mi Cuenta</h2>
                        <ul className="text-gray-400">
                            <li><a href="/" className="hover:underline hover:text-gray-500">Mis Pedidos</a></li>
                            <li><a href="/" className="hover:underline hover:text-gray-500">Seguimiento de Envío</a></li>
                            <li><a href="/" className="hover:underline hover:text-gray-500">Lista de Deseos</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Síguenos</h2>
                        <div className="flex space-x-4">
                            <a target='_blank' href="https://x.com/Truequemania1" className="hover:text-gray-500">X/Twitter</a>
                            <a target='_blank' href="https://www.youtube.com/@Truequemania" className="hover:text-gray-500">YouTube</a>
                        </div>
                    </div>

                    <div>
                        <p id="errSuscribe" className="err hidden text-red-500 text-sm font-medium rounded-lg text-center"></p>
                        <p id="successSuscribe" className="success hidden text-green-500 text-sm font-medium rounded-lg text-center"></p>
                        <form onSubmit={handleSubmitSuscribe}>
                            <h2 className="mb-4 text-lg font-semibold">Suscríbete</h2>
                            <p className="text-gray-400">Recibe ofertas exclusivas y novedades.</p>
                            <input
                                type="email"
                                placeholder="Tu correo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-2 p-2 w-full rounded border border-gray-700 bg-gray-800 text-white"
                            />
                            <button type='submit' className="mt-2 px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500" disabled={isLoading}
                            >
                                {isLoading ? "Suscribiendo ..." : "Suscribirme"}
                            </button>
                        </form>
                    </div>
                </div>

                <hr className="my-6 border-gray-700" />

                <div className="flex flex-col md:flex-row md:justify-between">
                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Métodos de Pago</h2>
                        <div className="flex space-x-4">
                            <img src={visa} alt="Visa" className="h-8" />
                            <img src={mastercard} alt="Mastercard" className="h-8" />
                            <img src={paypal} alt="PayPal" className="h-8" />
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Descarga Nuestra App</h2>
                        <div className="flex space-x-4">
                            <a target='_blank' href="https://apps.apple.com/app/idtruequemania"><img src={appStore} alt="App Store" className="h-10" /></a>
                            <a target='_blank' href="https://play.google.com/store/apps/details?id=truequemania&pli=1"><img src={googlePlay} alt="Google Play" className="h-10" /></a>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center text-gray-400 text-sm">
                    © 2025 Truequemania. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
