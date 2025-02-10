import { useEffect, useState } from "react";

function FavoritoFormImage({ toggleModalImagen }: any) {
  const [imageUrl, setImagenUrl] = useState<string>("");

  useEffect(() => {
    const imagenSeleccionado = localStorage.getItem("imagenFavorito");
    if (imagenSeleccionado) {
      const imagen = JSON.parse(imagenSeleccionado);
      setImagenUrl(imagen.imagen || "");
    }
  }, []);

  const handleClose = () => {
    localStorage.removeItem("imagenFavorito");
    toggleModalImagen();
  };

  return (
    <div
      id="authentication-modal"
      className="bg-gray-100 bg-opacity-50 formPer fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center"
    >
      <div className="relative w-full max-w-2xl bg-gray-900 rounded-lg shadow-lg p-6">
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
          onClick={handleClose}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Cerrar modal</span>
        </button>
        <h3 className="text-2xl font-medium text-white mb-4">Imagen</h3>
        <div className="text-center">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Vista previa"
              className="rounded-lg mx-auto max-w-full h-60 object-contain mb-4"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FavoritoFormImage;
