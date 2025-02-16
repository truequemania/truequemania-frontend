import ChatCabeceraAdmin from "../../../components/admin/chat/ChatHeaderAdmin";
import ChatTableAdmin from "../../../components/admin/chat/ChatTableAdmin";

function ChatsAdmin() {

  return (
    <div className="bg-gray-900 p-4 rounded-lg mt-14 shadow-md mt-20">
      <ChatCabeceraAdmin />
      <ChatTableAdmin />
    </div>
  );
}

export default ChatsAdmin;
