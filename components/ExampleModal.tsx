import React from "react";
import { Dialog } from "@headlessui/react";

interface ExampleModalProps {
  message: string;
  onClose: () => void;
}

const ExampleModal: React.FC<ExampleModalProps> = ({ message, onClose }) => {
  return (
    <Dialog
      open
      transition
      onClose={onClose}
      className="relative z-50 transition duration-200 ease-out data-[closed]:opacity-0"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
          <div className="text-lg font-bold">Example Modal</div>
          <p>{message}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ExampleModal;
