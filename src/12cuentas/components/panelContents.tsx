import { useState } from "react";
import FormPassword from "./formPassword";

function PanelContent({ isDropdownOpen }: { isDropdownOpen: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className={`absolute top-12 right-4 z-10 text-base list-none divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700 ${
          isDropdownOpen ? "block" : "hidden"
        }`}
      >
        <ul className="py-2">
          <li>
            <a
              className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white cursor-pointer"
              onClick={toggleModal}
            >
              Actualizar contraseña
            </a>
          </li>
        </ul>
      </div>
      {isOpen && <FormPassword toggleModal={toggleModal} isOpen={isOpen} />}
    </div>
  );
}

export default PanelContent;
