import { useNavigate } from "react-router-dom";
import authRedirectNoToken from "../components/ts/autRedirectNoToken";
import { useEffect } from "react";
import ChatTable from "./components/ChatTable";
import roleAdmin from "../components/ts/roleAdmin";
import WhatsAppFloatingButton from "../components/tsx/whatsapp";
import ChatCabecera from "./components/ChatCabecera";

function Chats() {
  
  authRedirectNoToken("/login");
  const navigate = useNavigate();

  useEffect(() => {
    roleAdmin(navigate);
  }, [navigate]);

  return (
    <div className="bg-gray-900 p-4 rounded-lg mt-14 shadow-md mt-20">
      <ChatCabecera />
      <ChatTable />
      <WhatsAppFloatingButton />
    </div>
  );
}

export default Chats;
