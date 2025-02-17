import User from "../../../validation/client/article/user";
import authRedirectNoToken from "../../../components/ts/autRedirectNoToken";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import roleAdmin from "../../../components/ts/roleAdmin";
import WhatsAppFloatingButton from "../../../components/tsx/whatsapp";
import ArticulosCabecera from "../../../components/client/article/articleHeader";
import ArticleTable from "../../../components/client/article/articuleTable";
import ArticleForm from "../../../components/client/article/articleForm";
import ArticleFormImage from "../../../components/client/article/articleFormImagen";

function Article() {
  authRedirectNoToken("/login");

  const navigate = useNavigate();

  useEffect(() => {
    roleAdmin(navigate);
  }, [navigate]);

  useEffect(() => {
    roleAdmin(navigate);
  }, [navigate]);

  const {
    setId,
    setNombre,
    setDescripcion,
    setCategoria,
    setEstado,
    setImagen,
    isOpen,
    setIsOpen,
    isOpenImg,
    setIsOpenImg,
  } = User();

  const toggleModal = () => {
    setId(0);
    setNombre("");
    setDescripcion("");
    setCategoria("");
    setEstado("");
    setImagen(null);
    setIsOpen(!isOpen);
    localStorage.removeItem("articuloSeleccionado");
  };

  const toggleModalAct = () => {
    setId(0);
    setNombre("");
    setDescripcion("");
    setCategoria("");
    setEstado("");
    setImagen(null);
    setIsOpen(!isOpen);
  };

  const toggleModalImagen = () => {
    setIsOpenImg(!isOpenImg);
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg mt-14 shadow-md mt-20">
      <ArticulosCabecera toggleModal={toggleModal} />
      <ArticleTable
        toggleModalAct={toggleModalAct}
        toggleModalImagen={toggleModalImagen}
      />
      {isOpen && <ArticleForm toggleModal={toggleModal} />}
      {isOpenImg && (
        <ArticleFormImage toggleModalImagen={toggleModalImagen} />
      )}
      <WhatsAppFloatingButton />
    </div>
  );
}

export default Article;
