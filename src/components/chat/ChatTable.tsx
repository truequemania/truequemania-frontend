import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { linkBackend, linkFrontend } from "../../ts/urls";
import { handleGetUserId } from "../../../validation/chat/handleGet";
import ChatForm from "./ChatForm";
import { handleGetUserIntercambios } from "../../../validation/intercambios/handleGet";

type Chat = {
  id: number;
  nameChange: string;
  userOne: { id: number; name: string };
  userTwo: { id: number; name: string };
};

type Intercambio = {
  id: number;
  userOneId: number;
  userTwoId: number;
  estatus: boolean;
  userCreate: {
    id: number;
    name: string;
    email: string;
  };
  nameChange: string;
};

let socket: Socket | null = null;

function ChatTable() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [intercambios, setIntercambios] = useState<Intercambio[]>([]);
  const [notifications, setNotifications] = useState<Record<number, number>>(
    {}
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<{
    chat: Chat;
    isUpdating: boolean;
    intercambioId?: number;
  } | null>(null);

  const userSession = localStorage.getItem("USER_SESSION");
  const parsedSession = userSession ? JSON.parse(userSession) : null;
  const currentUserId = parsedSession?.id;

  useEffect(() => {
    handleGetUserId()
      .then((data: Chat[]) => {
        setChats(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (currentUserId) {
      handleGetUserIntercambios(currentUserId)
        .then((data: Intercambio[]) => {
          setIntercambios(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [currentUserId]);

  useEffect(() => {
    if (currentUserId && chats.length > 0) {
      socket = io(linkBackend);

      const chatIds = chats.map((chat) => chat.id);
      socket.emit("registerUserChats", {
        userId: currentUserId,
        chats: chatIds,
      });

      socket.on(
        "notificationCountChats",
        (data: { chatId: number; unreadCount: number }) => {
          if (data.chatId !== undefined) {
            setNotifications((prev) => ({
              ...prev,
              [data.chatId]: data.unreadCount,
            }));
          } else {
            console.error(
              "Error: chatId no está definido en la notificación:",
              data
            );
          }
        }
      );

      return () => {
        socket?.disconnect();
      };
    }
  }, [currentUserId, chats]);

  const getButtonText = (chat: Chat): string => {
    const intercambio = intercambios.find(
      (int) =>
        int.userOneId === chat.userOne.id &&
        int.userTwoId === chat.userTwo.id &&
        int.nameChange === chat.nameChange
    );

    if (!intercambio) {
      return "Cerrar intercambio";
    }

    if (intercambio.userCreate.id === currentUserId) {
      return "Cerrando ...";
    }

    if (
      intercambio.userOneId === currentUserId ||
      intercambio.userTwoId === currentUserId
    ) {
      return "Aceptar cierre";
    }

    return "Cerrar intercambio";
  };

  const toggleModal = (chat?: Chat, isUpdating = false) => {
    if (chat) {
      setSelectedChat({ chat, isUpdating });
    }
    setIsOpen(!isOpen);
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
                Usuario 1
              </th>
              <th scope="col" className="px-6 py-3">
                Usuario 2
              </th>
              <th scope="col" className="px-6 py-3">
                Notificaciones
              </th>
              <th scope="col" className="px-6 py-3">
                Mensaje
              </th>
              <th scope="col" className="px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {chats.map((chat) => {
              const notificationCount = notifications[chat.id] || 0;
              const buttonText = getButtonText(chat);

              return (
                <tr
                  key={chat.id}
                  className="border-b bg-gray-900 border-gray-700"
                >
                  <th scope="row" className="px-6 py-4 font-medium text-white">
                    {chat.nameChange}
                  </th>
                  <td className="px-6 py-4">{chat.userOne.name}</td>
                  <td className="px-6 py-4">{chat.userTwo.name}</td>
                  <td className="px-6 py-4">
                    {notificationCount > 0 ? (
                      <span className="text-orange-500 font-bold">
                        {notificationCount} nueva(s)
                      </span>
                    ) : (
                      <span className="text-orange-500 font-bold">
                        nueva(0)
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`${linkFrontend}/messenger?userId=${currentUserId}&receiverId=${
                        chat.userOne.id === currentUserId
                          ? chat.userTwo.id
                          : chat.userOne.id
                      }&chatId=${chat.id}&nameChat=${chat.nameChange}`}
                      className="ml-8 font-medium text-blue-500 hover:underline"
                    >
                      Enviar mensaje
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className={`ml-8 font-medium hover:underline ${
                        buttonText === "Cerrar intercambio"
                          ? "text-red-500"
                          : buttonText === "Cerrando ..."
                          ? "text-orange-500"
                          : "text-green-500"
                      }`}
                      onClick={() => {
                        const intercambio = intercambios.find(
                          (int) =>
                            int.userOneId === chat.userOne.id &&
                            int.userTwoId === chat.userTwo.id &&
                            int.nameChange === chat.nameChange
                        );

                        if (buttonText === "Aceptar cierre" && intercambio) {
                          toggleModal(chat, true);
                          setSelectedChat({
                            chat,
                            isUpdating: true,
                            intercambioId: intercambio.id,
                          });
                        } else if (buttonText === "Cerrar intercambio") {
                          toggleModal(chat, false);
                        }
                      }}
                    >
                      {buttonText}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {isOpen && selectedChat && (
        <ChatForm
          toggleModal={toggleModal}
          nameChange={selectedChat.chat.nameChange}
          userOneId={selectedChat.chat.userOne.id}
          userTwoId={selectedChat.chat.userTwo.id}
          isUpdating={selectedChat.isUpdating}
          intercambioId={selectedChat.intercambioId} 
        />
      )}
    </div>
  );
}

export default ChatTable;
