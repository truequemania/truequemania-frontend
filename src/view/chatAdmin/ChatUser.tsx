import { useNavigate } from "react-router-dom";
import authRedirectNoToken from "../../components/ts/autRedirectNoToken";
import roleClient from "../../components/ts/roleClient";
import { useEffect } from "react";
import ChatTableUser from "../../components/chatAdmin/ChatTableUser";
import ChatCabeceraUser from "../../components/chatAdmin/ChatCabeceraUser";

function ChatsUser() {
  authRedirectNoToken("/login");
  const navigate = useNavigate();

  useEffect(() => {
    roleClient(navigate);
  }, [navigate]);

  

  return (
  <div className="bg-gray-900 p-4 rounded-lg mt-14 shadow-md mt-20">
    <ChatCabeceraUser />
    <ChatTableUser />
  </div>
  );
}

export default ChatsUser;
