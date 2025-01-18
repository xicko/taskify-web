import React from "react";
import { Dialog } from "@headlessui/react";

interface AnotherModalProps {
  onClose: () => void;
}

const AnotherModal: React.FC<AnotherModalProps> = ({ onClose }) => {
  return (
    <Dialog open onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
          <div className="text-lg font-bold">Another Modal</div>
          <p>This is another modal.</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default AnotherModal;
