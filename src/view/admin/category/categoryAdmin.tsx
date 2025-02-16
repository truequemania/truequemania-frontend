import authRedirectNoToken from "../../../components/ts/autRedirectNoToken";
import User from "../../../validation/admin/category/user";
import CategoriaCabecera from "../../../components/admin/category/categoryHeader";
import CategoriaTable from "../../../components/admin/category/categoryTable";
import CategoriaForm from "../../../components/admin/category/categoryForm";

function CategoryAdmin() {
  authRedirectNoToken("/login");

  const { setId, setNombre, setDescripcion, isOpen, setIsOpen } = User();

  const toggleModal = () => {
    setId(0);
    setNombre("");
    setDescripcion("");
    setIsOpen(!isOpen);
  };

  const toggleModalAct = () => {
    setId(0);
    setNombre("");
    setDescripcion("");
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg mt-14 shadow-md mt-20">
      <CategoriaCabecera toggleModal={toggleModal} />
      <CategoriaTable toggleModalAct={toggleModalAct} />
      {isOpen && <CategoriaForm toggleModal={toggleModal} />}
    </div>
  );
}

export default CategoryAdmin;
