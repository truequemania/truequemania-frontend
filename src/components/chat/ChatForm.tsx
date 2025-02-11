import { useState } from "react";
import Message from "../tsx/message";
import Handle from "../../validation/chat/handle";
import { handleDelete } from "../../validation/chat/handleDelete";

function ChatForm({
  toggleModal,
  nameChange,
  userOneId,
  userTwoId,
  isUpdating = false,
  intercambioId,
}: {
  toggleModal: () => void;
  nameChange: string;
  userOneId: number;
  userTwoId: number;
  isUpdating?: boolean;
  intercambioId?: number;
}) {
  const [puntuacion, setPuntuacion] = useState(1);
  const [comentario, setComentario] = useState("");

  const { handleSubmitForm, isLoading } = Handle(
    userOneId,
    userTwoId,
    nameChange,
    puntuacion,
    comentario,
    isUpdating,
    intercambioId
  );

  const handleCancel = () => {
    const phoneNumber = "56964720520";
    const disputeMessage = encodeURIComponent(
      `Hola, quiero iniciar una disputa sobre el intercambio con nombre "${nameChange}".`
    );
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${disputeMessage}`;
    window.open(whatsappLink, "_blank");
    toggleModal();
    handleDelete(intercambioId, userOneId);
  };

  return (
    <div
      id="authentication-modal"
      className="bg-gray-100 bg-opacity-50 formPer fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center"
    >
      <div className="relative w-full max-w-2xl bg-gray-900 rounded-lg shadow-lg p-6">
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
          onClick={toggleModal}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Cerrar modal</span>
        </button>
        <div className="px-6 py-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-white">
            {isUpdating ? "Cerrar intercambio" : "Cerrar intercambio"}
          </h3>
          <Message />
          <form className="space-y-6" onSubmit={handleSubmitForm}>
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Puntuación
              </label>
              <select
                className="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                value={puntuacion}
                onChange={(e) => setPuntuacion(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Comentario
              </label>
              <textarea
                placeholder="Comentario"
                className="bg-gray-600 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="mb-10 mt-5 w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={isLoading}
              >
                {isLoading
                  ? isUpdating
                    ? "Actualizando..."
                    : "Creando..."
                  : isUpdating
                  ? "Actualizar"
                  : "Crear"}
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <button
              type="button"
              className="text-red-500 hover:text-red-700 font-medium text-sm"
              onClick={handleCancel}
            >
              Estar en desacuerdo y entrar en disputa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatForm;
