import { useNavigate } from "react-router-dom";
import authRedirectNoToken from "../../../components/ts/autRedirectNoToken";
import { useEffect } from "react";
import roleAdmin from "../../../components/ts/roleAdmin";
import WhatsAppFloatingButton from "../../../components/tsx/whatsapp";
import ChatHeader from "../../../components/client/chat/ChatHeader";
import ChatTable from "../../../components/client/chat/ChatTable";


function Chats() {
  
  authRedirectNoToken("/login");
  const navigate = useNavigate();

  useEffect(() => {
    roleAdmin(navigate);
  }, [navigate]);

  return (
    <div className="bg-gray-900 p-4 rounded-lg mt-14 shadow-md mt-20">
      <ChatHeader />
      <ChatTable />
      <WhatsAppFloatingButton />
    </div>
  );
}

export default Chats;
