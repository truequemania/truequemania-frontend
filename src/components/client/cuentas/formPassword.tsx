import ButtonUser from "../../password/buttonUser";
import PasswordUser from "../../password/passwordUser";
import VerPasswordUser from "../../password/verPasswordUser";
import Handle from "../../../validation/password/handle";
import User from "../../../validation/password/user";
import Message from "../../tsx/message";

function FormPassword({
    toggleModal,
    isOpen,
  }: {
    toggleModal: () => void;
    isOpen: boolean;
  }) {
  const {
    password,
    setPassword,
    verPassword,
    setVerPassword,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = User();

  const { handleSubmit, isLoading } = Handle(
    password,
    verPassword
  );

  const handleClose = () => {
    toggleModal();
  };
  
  return (
    <div
      id="authentication-modal"
      className="bg-gray-100 bg-opacity-50 formPer fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center"
      aria-hidden={!isOpen ? "true" : undefined}
    >
      <div
        className="relative w-full max-w-md max-h-full"
        aria-hidden={isOpen ? "false" : "true"}
      >
        <div className="relative bg-gray-900 rounded-lg shadow-lg">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
            data-modal-hide="authentication-modal"
            onClick={handleClose}
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
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-white">
              Actualizar contraseña
            </h3>
            <Message />
            <form onSubmit={handleSubmit} className="space-y-6">
              <PasswordUser
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
              />

              <VerPasswordUser
                verpassword={verPassword}
                setVerPassword={setVerPassword}
                showConfirmPassword={showConfirmPassword}
                toggleConfirmPasswordVisibility={
                  toggleConfirmPasswordVisibility
                }
              />

              <ButtonUser isLoading={isLoading} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormPassword;
