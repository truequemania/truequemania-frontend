import { useEffect, useState } from "react";
import { handleGet } from "../../../validation/admin/chat/handleGet";
import { Modal } from "../../tsx/toast";
import { handleDelete } from "../../../validation/admin/chat/handleDelete";

function ChatTableAdmin() {
  const [chats, setChats] = useState<
    {
      id: number;
      nameChange: string;
      userOne: {name: string;};
      userTwo: {name: string;};
    }[]
  >([]);

  useEffect(() => {
    handleGet()
      .then((data) => {
        setChats(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {chats.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-center text-gray-400">
          <p className="text-lg">No hay chats para mostrar.</p>
        </div>
      ) : (
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Chats
              </th>
              <th scope="col" className="px-6 py-3">
                Cliente 1
              </th>
              <th scope="col" className="px-6 py-3">
                Cliente 2
              </th>
              <th scope="col" className="px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {chats.map((chat, index) => (
              <tr key={index} className="border-b bg-gray-900 border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-white"
                >
                  {chat.nameChange}
                </th>
                <td className="px-6 py-4">{chat.userOne.name}</td>
                <td className="px-6 py-4">{chat.userTwo.name}</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    onClick={showModal}
                    className="ml-8 font-medium text-red-500 hover:underline"
                  >
                    Eliminar
                  </a>
                  <Modal
                    onConfirm={() => {
                      handleDelete(chat);
                      showModal();
                    }}
                    isVisible={isModalVisible}
                    onClose={showModal}
                    message="¿Estás seguro de eliminar el chats?"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ChatTableAdmin;
