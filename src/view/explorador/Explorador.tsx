import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleGet } from "../../validation/articulo/handleGet";
import ArticulosFormImage from "../../components/articulo/articulosFormImagen";
import roleAdmin from "../../components/ts/roleAdmin";
import { handleGetFavorito } from "../../validation/favorito/handleGet";
import { handleFavorito } from "../../validation/favorito/Submit";
import { handleDeleteFav } from "../../validation/favorito/handleDelete";
import WhatsAppFloatingButton from "../../components/tsx/whatsapp";
import Header from "../../components/header";
import Footer from "../../components/footer";
import HeaderSesion from "../../components/headerSesion";
import AutoSlider from "../../components/autoSlider";

function Explorador() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    roleAdmin(navigate);
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    setIsAuthenticated(!!token);
  }, []);

  const [articulos, setArticulos] = useState<
    {
      id: number;
      nombre: string;
      descripcion: string;
      fecha: string;
      estado: string;
      imagen: string;
      email: string;
      name: string;
      user: {
        id: number;
        name: string;
      };
    }[]
  >([]);

  const [favoritoIds, setFavoritoIds] = useState<number[]>([]);
  const [isOpenImg, setIsOpenImg] = useState(false);

  useEffect(() => {
    handleGet()
      .then((data) => {
        setArticulos(data);
      })
      .catch((error) => {
        console.error("Error al obtener los artículos:", error);
      });

    handleGetFavorito()
      .then((data) => {
        setFavoritoIds(data.map((fav: any) => fav.articulo.id));
      })
      .catch((error) => {
        console.error("Error al obtener los favoritos:", error);
      });
  }, []);

  const toggleModalImagen = () => {
    setIsOpenImg(!isOpenImg);
  };

  const handleImagen = (imagen: string) => {
    const articulo = { imagen };
    localStorage.setItem("imagenSeleccionado", JSON.stringify(articulo));
    toggleModalImagen();
  };

  const IdCuentas = (id: number) => {
    navigate(`/cuentas/${id}`);
  };

  return (
    <div>

      {isAuthenticated ? <HeaderSesion /> : <Header />}
      <AutoSlider />
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 relative flex flex-col justify-between h-auto p-4 rounded-lg mt-14 shadow-md">
        {isOpenImg && (
          <ArticulosFormImage toggleModalImagen={toggleModalImagen} />
        )}

        <form className="w-full flex justify-center mt-6">
          <div className="relative w-3/4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-12 text-lg text-white border border-gray-600 rounded-lg bg-gray-800 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400"
              placeholder="Buscar artículos..."
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-400 font-medium rounded-lg text-sm px-5 py-2"
            >
              Buscar
            </button>
          </div>
        </form>

        {articulos.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center h-64 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              No hay artículos disponibles
            </h2>
            <p className="text-gray-400 mb-6">
              Por el momento no hay artículos para mostrar. Intenta más tarde.
            </p>
            <img
              src="https://via.placeholder.com/200x200?text=Sin+Articulos"
              alt="Sin artículos"
              className="rounded w-48 h-48 object-cover"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-4">
            {articulos.map((articulo) => (
              <div
                key={articulo.id}
                className="max-w-sm border bg-gray-800 border-gray-700 rounded-lg shadow"
              >
                <a href="#">
                  <img
                    className="rounded-t-lg w-full h-48 object-cover"
                    src={articulo.imagen || "https://via.placeholder.com/150"}
                    alt={articulo.nombre}
                    onClick={() => handleImagen(articulo.imagen)}
                  />
                </a>
                <div className="p-5">
                  <div className="flex justify-center mb-3">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        IdCuentas(articulo.user.id);
                      }}
                    >
                      <span className="text-sm font-semibold text-orange-400 cursor-pointer">
                        {articulo.user.name}
                      </span>
                    </a>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">
                      Fecha: {new Date(articulo.fecha).toLocaleDateString()}
                    </span>
                    <span className="text-sm font-semibold text-green-600">
                      Estado: {articulo.estado}
                    </span>
                  </div>
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                      {articulo.nombre}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-400">
                    {articulo.descripcion.length > 100
                      ? `${articulo.descripcion.substring(0, 100)}...`
                      : articulo.descripcion}
                  </p>
                  <a
                    href="#"
                    onClick={async (e) => {
                      e.preventDefault();

                      const isFavorito = favoritoIds.includes(articulo.id);

                      try {
                        if (isFavorito) {
                          await handleDeleteFav(articulo.id);
                          setFavoritoIds(
                            favoritoIds.filter((id) => id !== articulo.id)
                          );
                        } else {
                          const addedArticuloId = await handleFavorito(
                            articulo.id,
                            navigate
                          );
                          setFavoritoIds([...favoritoIds, addedArticuloId]);
                        }
                      } catch (error) {
                        console.error("Error al actualizar favorito:", error);
                      }
                    }}
                  >
                    <img
                      alt="Favorito"
                      className="w-10 h-10 object-cover cursor-pointer mx-auto transition-transform transform hover:scale-110"
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
        <WhatsAppFloatingButton />
      </div>
      <Footer />
    </div>
  );
}

export default Explorador;
