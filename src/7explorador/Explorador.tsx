import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleGet } from "../8articulos/validation/handleGet";
import ArticulosFormImage from "../8articulos/components/articulosFormImagen";
import roleAdmin from "../components/ts/roleAdmin";
import { handleGetFavorito } from "../9favorito/validation/handleGet";
import { handleFavorito } from "../9favorito/validation/Submit";
import { handleDeleteFav } from "../9favorito/validation/handleDelete";
import WhatsAppFloatingButton from "../components/tsx/whatsapp";
import intercambio1 from "../assets/intercambio1.png";
import intercambio2 from "../assets/intercambio2.png";

function Explorador() {
  const navigate = useNavigate();

  useEffect(() => {
    roleAdmin(navigate);
  }, [navigate]);

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
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 relative flex flex-col justify-between h-auto p-4 rounded-lg mt-14 shadow-md">
      {isOpenImg && (
        <ArticulosFormImage toggleModalImagen={toggleModalImagen} />
      )}

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
                    src={favoritoIds.includes(articulo.id) ? intercambio2 : intercambio1}
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
  );
}

export default Explorador;
