import { useEffect, useState } from "react";
import { handleGetUserIntercambiosId } from "../../../validation/client/exchange/handleGet";

interface Intercambio {
  intercambioId: number;
  nameChange: string;
  nombreUsuario: string;
  comentarioRecibido: string;
  puntuacionRecibida: number;
}

function IntTable() {
  const [intercambios, setIntercambios] = useState<Intercambio[]>([]); 
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Intercambio | null>(null); 

  const userSession = localStorage.getItem("USER_SESSION");
  const parsedSession = userSession ? JSON.parse(userSession) : null;
  const id = parsedSession?.id;

  useEffect(() => {
    handleGetUserIntercambiosId(id)
      .then((data: Intercambio[]) => {
        setIntercambios(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {intercambios.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-center text-gray-400">
          <p className="text-lg">No hay intercambios para mostrar.</p>
        </div>
      ) : (
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre del Intercambio
              </th>
              <th scope="col" className="px-6 py-3">
                Usuario Calificador
              </th>
              <th scope="col" className="px-6 py-3">
                Comentario
              </th>
              <th scope="col" className="px-6 py-3">
                Puntuación
              </th>
              <th scope="col" className="px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {intercambios.map((intercambio) => (
              <tr
                key={intercambio.intercambioId}
                className="border-b bg-gray-900 border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-white">
                  {intercambio.nameChange}
                </td>
                <td className="px-6 py-4">{intercambio.nombreUsuario}</td>
                <td className="px-6 py-4">{intercambio.comentarioRecibido}</td>
                <td className="px-6 py-4">{intercambio.puntuacionRecibida}</td>
                <td className="px-6 py-4">
                  <button
                    className="ml-8 font-medium text-blue-500 hover:underline"
                    onClick={() => {
                      setSelectedChat(intercambio);
                      setIsOpen(true);
                    }}
                  >
                    Ver detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isOpen && selectedChat && (
        <div className="modal text-white">
          <p>Detalles del intercambio:</p>
          <p>Intercambio: {selectedChat.nameChange}</p>
          <p>Usuario: {selectedChat.nombreUsuario}</p>
          <p>Comentario: {selectedChat.comentarioRecibido}</p>
          <p>Puntuación: {selectedChat.puntuacionRecibida}</p>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}

export default IntTable;
