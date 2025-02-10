import { useNavigate } from "react-router-dom";
import authRedirectNoToken from "../components/ts/autRedirectNoToken";
import { useEffect } from "react";
import roleAdmin from "../components/ts/roleAdmin";
import WhatsAppFloatingButton from "../components/tsx/whatsapp";
import IntCabecera from "./components/IntCabecera";
import IntTable from "./components/IntTable";

function Intercambios() {
  authRedirectNoToken("/login");

  const navigate = useNavigate();

  useEffect(() => {
    roleAdmin(navigate);
  }, [navigate]);

  return (
    <div className="bg-gray-900 p-4 rounded-lg mt-14 shadow-md mt-20">
      <IntCabecera />
      <IntTable /> 
      <WhatsAppFloatingButton />
    </div>
  );
}

export default Intercambios;
