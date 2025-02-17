import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from "../tsx/toast";
import NavBarUser from "../tsx/navBarUser";
import SidebarUser from "../tsx/asideUser";
import roleAdmin from "../ts/roleAdmin";
import authRedirectNoToken from "../ts/autRedirectNoToken";
import Footer from "../admin/footer";

function Client() {

  authRedirectNoToken("/login");

  const navigate = useNavigate();

  useEffect(() => {
    roleAdmin(navigate);
  }, [navigate]);

  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(!isModalVisible);
  const toggleAside = () => setIsAsideOpen(!isAsideOpen);

  const logOut = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    navigate("/");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsAsideOpen(false);
  };

  const navLinks = [
    { path: "/article", label: "Artículos" },
    { path: "/favorite", label: "Favoritos" },
    { path: "/chats", label: "Chats" },
    { path: "/exchange", label: "Intercambios" },
  ];

  return (
    <div className="font-quicksand ">
      <NavBarUser toggleAside={toggleAside} />
      <SidebarUser
        isAsideOpen={isAsideOpen}
        handleNavigation={handleNavigation}
        navLinks={navLinks}
        showModal={showModal}
      />
      <div className={`flex-1 transition-all ${isAsideOpen ? "lg:ml-64" : "ml-0"} flex flex-col`}>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        <Footer />
      </div>
      <Modal
        onConfirm={() => {
          logOut();
          showModal();
        }}
        isVisible={isModalVisible}
        onClose={showModal}
        message="¿Estás seguro de cerrar sesión?"
      />
    </div>
  );
}

export default Client;
