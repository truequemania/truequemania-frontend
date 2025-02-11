import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authRedirectNoToken from "../../components/ts/autRedirectNoToken";
import roleAdmin from "../../components/ts/roleAdmin";
import PanelContent from "../../components/cuentas/panelContents";
import { handleGetUserId } from "../../validation/cuentas/handleGet";

function Cuentas() {
  const { id } = useParams();
  authRedirectNoToken("/login");
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState<{
    user: { name: string; email: string };
    articulos: {
      id: number;
      nombre: string;
      descripcion: string;
      estado: string;
      imagen: string;
    }[];
    favoritos: {
      articulo: {
        id: number;
        nombre: string;
        descripcion: string;
        estado: string;
        imagen: string;
      };
    }[];
    intercambios: {
      intercambioId: number;
      comentarioRecibido: string;
      nameChange: string;
      nombreUsuario: string;
      puntuacionRecibida: number;
    }[];
  } | null>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const userSession = localStorage.getItem("USER_SESSION");
  const parsedSession = userSession ? JSON.parse(userSession) : null;
  const user_id = parsedSession?.id;

  useEffect(() => {
    roleAdmin(navigate);
  }, [navigate]);

  useEffect(() => {
    handleGetUserId(id)
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!userData) {
    return (
      <div className="text-white text-center mt-20">Cargando datos...</div>
    );
  }

  const { user, articulos = [], favoritos = [], intercambios = [] } = userData;

  return (
    <div className="mt-20 bg-gray-900 p-4 sm:p-6 rounded-lg shadow-md flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl border rounded-lg shadow bg-gray-800 border-gray-700">
        <div className="flex justify-end px-4 pt-4 relative">
          {id == user_id && (
            <>
              <button
                onClick={toggleDropdown}
                className="inline-block text-gray-400 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-700 rounded-lg text-sm p-1.5"
                type="button"
              >
                <span className="sr-only">Open dropdown</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 3"
                >
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
              </button>
              <PanelContent isDropdownOpen={isDropdownOpen} />
            </>
          )}
        </div>

        <div className="flex flex-col items-center justify-center text-center pb-10">
          <h5 className="mb-1 text-lg sm:text-xl font-medium text-white">
            {user.name || "Nombre no disponible"}
          </h5>
          <span className="text-sm text-gray-400">
            {user.email || "Correo no disponible"}
          </span>
        </div>

        <div className="px-6 py-4">
          <h3 className="text-lg sm:text-xl font-medium text-white mb-4">
            Artículos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articulos?.length > 0 ? (
              articulos.map((articulo) => (
                <div
                  key={articulo.id}
                  className="bg-gray-700 p-4 rounded-lg shadow"
                >
                  <img
                    className="w-full h-32 object-cover rounded-lg mb-4"
                    src={articulo.imagen || ""}
                    alt={articulo.nombre || "Sin imagen"}
                  />
                  <h4 className="font-medium text-white">
                    {articulo.nombre || "Sin nombre"}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {articulo.descripcion || "Sin descripción"}
                  </p>
                  <p className="text-sm text-gray-400">
                    {articulo.estado || "Sin estado"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No hay artículos disponibles.</p>
            )}
          </div>
        </div>

        <div className="px-6 py-4">
          <h3 className="text-lg sm:text-xl font-medium text-white mb-4">
            Favoritos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoritos?.length > 0 ? (
              favoritos.map((favorito) => (
                <div
                  key={favorito.articulo.id}
                  className="bg-gray-700 p-4 rounded-lg shadow"
                >
                  <img
                    className="w-full h-32 object-cover rounded-lg mb-4"
                    src={favorito.articulo.imagen || ""}
                    alt={favorito.articulo.nombre || "Sin imagen"}
                  />
                  <h4 className="font-medium text-white">
                    {favorito.articulo.nombre || "Sin nombre"}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {favorito.articulo.descripcion || "Sin descripción"}
                  </p>
                  <p className="text-sm text-gray-400">
                    {favorito.articulo.estado || "Sin estado"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No hay favoritos disponibles.</p>
            )}
          </div>
        </div>

        <div className="px-6 py-4">
          <h3 className="text-lg sm:text-xl font-medium text-white mb-4">
            Intercambios
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {intercambios?.length > 0 ? (
              intercambios.map((intercambio) => (
                <div
                  key={intercambio.intercambioId}
                  className="bg-gray-700 p-4 rounded-lg shadow"
                >
                  <h4 className="font-medium text-white">
                    {intercambio.nameChange || "Sin nombre"}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {intercambio.nombreUsuario || "Sin usuario"}
                  </p>
                  <p className="text-sm text-gray-400">
                    {intercambio.comentarioRecibido || "Sin comentario"}
                  </p>
                  <p className="text-sm text-gray-400">
                    {intercambio.puntuacionRecibida || "Sin puntuación"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No hay intercambios disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cuentas;
