import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { linkBackend } from "../../../components/ts/urls";
import roleAdmin from "../../../components/ts/roleAdmin";
import authRedirectNoToken from "../../../components/ts/autRedirectNoToken";

let socket: Socket;

type Message = {
  senderId: number;
  content: string;
  createdAt: string;
};

type Chat = {
  id: number;
  name: string;
};

function Messenger() {
  authRedirectNoToken("/login");
  const navigate = useNavigate();

  useEffect(() => {
    roleAdmin(navigate);
  }, [navigate]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [chatId, setChatId] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const userIdFromUrl = searchParams.get("userId");
    const receiverIdFromUrl = searchParams.get("receiverId");
    const chatIdFromUrl = searchParams.get("chatId");
    const nameChangeFromUrl = searchParams.get("nameChat");

    if (
      userIdFromUrl &&
      receiverIdFromUrl &&
      chatIdFromUrl &&
      nameChangeFromUrl
    ) {
      const parsedChatId = Number(chatIdFromUrl);
      setUserId(Number(userIdFromUrl));
      setReceiverId(Number(receiverIdFromUrl));
      setChatId(parsedChatId);

      setChats((prevChats) => {
        if (!prevChats.some((chat) => chat.id === parsedChatId)) {
          return [...prevChats, { id: parsedChatId, name: nameChangeFromUrl }];
        }
        return prevChats;
      });

      connectToServer(
        Number(userIdFromUrl),
        Number(receiverIdFromUrl),
        parsedChatId
      );
    } else {
      navigate("/explorar");
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    if (socket) {
      socket.on("loadMessages", (messages) => {
        setMessages(messages);
      });

      socket.on("receiveMessage", (message) => {
        setMessages((prev) => [...prev, message]);
      });
    }
    return () => {
      if (socket) {
        socket.off("loadMessages");
        socket.off("receiveMessage");
      }
    };
  }, [socket]);

  const connectToServer = (
    userId: number,
    receiverId: number,
    chatId: number
  ) => {
    if (!isConnected && userId !== null) {
      if (!socket || !socket.connected) {
        socket = io(linkBackend, {
          query: { userId, chatId },
        });
      }

      socket.off("connect");
      socket.off("disconnect");
      socket.off("receiveMessage");

      socket.on("connect", () => {
        setIsConnected(true);
        setIsChatActive(true);

        socket.emit("joinRoom", { userId, chatId });
        socket.emit("joinRoom", { userId: receiverId, chatId });
      });

      socket.on("disconnect", () => {
        setIsConnected(false);
        setIsChatActive(false);
      });

      socket.on("receiveMessage", (message: Message) => {
        setMessages((prev) => [...prev, message]);
      });
    }
  };

  const sendMessage = () => {
    if (inputValue.trim() && receiverId !== null && chatId !== null) {
      socket.emit("sendMessage", {
        senderId: userId,
        receiverId,
        chatId,
        content: inputValue,
      });

      setInputValue("");
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100">
      <div className="flex-1 flex flex-col">
        
        <div className="p-4 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-700 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-white">Chat</p>
              <p
                className={`text-xs font-semibold ${
                  isConnected ? "text-green-500" : "text-red-500"
                }`}
              >
                {isConnected ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>

        {isChatActive ? (
          <div className="flex-1 p-4 overflow-y-auto bg-gray-800">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.senderId === userId ? "text-right" : ""
                }`}
              >
                <div
                  className={`${
                    msg.senderId === userId
                      ? "bg-gray-600 ml-auto"
                      : "bg-gray-700"
                  } text-white rounded-lg p-3 max-w-sm`}
                >
                  {msg.content}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 p-4 flex items-center justify-center bg-gray-800">
            <div className="text-white text-center">
              <p className="text-lg">Esperando IDs...</p>
            </div>
          </div>
        )}

        {isChatActive && (
          <div className="p-4 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t border-gray-700">
            <div className="flex items-center">
              <input
                type="text"
                className="flex-1 border rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-orange-600"
                placeholder="Escribe un mensaje..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                className="ml-3 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                onClick={sendMessage}
              >
                Enviar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messenger;
