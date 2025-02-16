import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleGet } from "../../validation/client/article/handleGet";
import roleAdmin from "../../components/ts/roleAdmin";
import WhatsAppFloatingButton from "../../components/tsx/whatsapp";
import Header from "../../components/home/header";
import HeaderSesion from "../../components/home/headerSesion";
import AutoSlider from "../../components/home/autoSlider";
import { handleGetFavorito } from "../../validation/client/favorite/handleGet";
import ArticleFormImage from "../../components/client/article/articleFormImagen";
import { handleDeleteFav } from "../../validation/client/favorite/handleDelete";
import { handleFavorito } from "../../validation/client/favorite/Submit";
import Footer from "../../components/home/footer";

interface Articulo {
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
}

function Home() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [favoritoIds, setFavoritoIds] = useState<number[]>([]);
  const [isOpenImg, setIsOpenImg] = useState(false);

  useEffect(() => {
    roleAdmin(navigate);
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    handleGet()
      .then((data: Articulo[]) => {
        setArticulos(data);
      })
      .catch((error) => {
        console.error("Error al obtener los artículos:", error);
      });

    handleGetFavorito()
      .then((data: any[]) => {
        setFavoritoIds(data.map((fav) => fav.articulo.id));
      })
      .catch((error:any) => {
        console.error("Error al obtener los favoritos:", error);
      });
  }, []);

  const toggleModalImagen = () => {
    setIsOpenImg(!isOpenImg);
  };

  const handleImagen = (imagen: string) => {
    localStorage.setItem("imagenSeleccionado", JSON.stringify({ imagen }));
    toggleModalImagen();
  };

  const IdCuentas = (id: number) => {
    navigate(`/cuentas/${id}`);
  };

  const filteredArticulos = articulos.filter((articulo) =>
    articulo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {isAuthenticated ? <HeaderSesion /> : <Header />}
      <AutoSlider />
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 flex flex-col justify-between h-auto p-4 rounded-lg mt-14 shadow-md">
        {isOpenImg && <ArticleFormImage toggleModalImagen={toggleModalImagen} />}

        <form className="w-full flex justify-center mt-6">
          <div className="relative w-3/4">
            <input
              type="search"
              className="block w-full p-4 pl-4 text-lg text-white border border-gray-600 rounded-lg bg-gray-800 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>

        {filteredArticulos.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center h-64 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">No hay artículos disponibles</h2>
            <p className="text-gray-400 mb-6">Por el momento no hay artículos para mostrar. Intenta más tarde.</p>
            <img src="https://via.placeholder.com/200x200?text=Sin+Articulos" alt="Sin artículos" className="rounded w-48 h-48 object-cover" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-4">
            {filteredArticulos.map((articulo) => (
              <div key={articulo.id} className="max-w-sm border bg-gray-800 border-gray-700 rounded-lg shadow">
                <a href="#">
                  <img className="rounded-t-lg w-full h-48 object-cover" src={articulo.imagen || "https://via.placeholder.com/150"} alt={articulo.nombre} onClick={() => handleImagen(articulo.imagen)} />
                </a>
                <div className="p-5">
                  <div className="flex justify-center mb-3">
                    <a href="#" onClick={(e) => { e.preventDefault(); IdCuentas(articulo.user.id); }}>
                      <span className="text-sm font-semibold text-orange-400 cursor-pointer">{articulo.user.name}</span>
                    </a>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">Fecha: {new Date(articulo.fecha).toLocaleDateString()}</span>
                    <span className="text-sm font-semibold text-green-600">Estado: {articulo.estado}</span>
                  </div>
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{articulo.nombre}</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-400">
                    {articulo.descripcion.length > 100 ? `${articulo.descripcion.substring(0, 100)}...` : articulo.descripcion}
                  </p>
                  <a href="#" onClick={async (e) => {
                    e.preventDefault();
                    const isFavorito = favoritoIds.includes(articulo.id);
                    try {
                      if (isFavorito) {
                        await handleDeleteFav(articulo.id);
                        setFavoritoIds(favoritoIds.filter((id) => id !== articulo.id));
                      } else {
                        const addedArticuloId = await handleFavorito(articulo.id, navigate);
                        setFavoritoIds([...favoritoIds, addedArticuloId]);
                      }
                    } catch (error) {
                      console.error("Error al actualizar favorito:", error);
                    }
                  }}>
                    <img alt="Favorito" className="w-10 h-10 object-cover cursor-pointer mx-auto transition-transform transform hover:scale-110" />
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

export default Home;
