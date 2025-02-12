import { useState, useEffect } from "react";

const images = [
    "https://appmarketingnews.io/wp-content/uploads/2024/11/truque_redes_sociales.jpg",
    "https://www.pnc.com/content/dam/pnc-thought-leadership/small-business/managing-business-finances/pnc_insights_business_trading_for_services.jpg",
    "https://fotografias.lasexta.com/clipping/cmsimages02/2023/02/24/5BF2A43C-84D6-433C-B8AD-8195C53DBBED/foto-movil-ropa_96.jpg?crop=5184,2916,x0,y120&width=1200&height=675&optimize=low&format=webply"
];

function AutoSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg h-[250px] md:h-[300px] lg:h-[350px]">
            <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover flex-shrink-0"
                    />
                ))}
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-orange-400" : "bg-gray-500"}`}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default AutoSlider;
