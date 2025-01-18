import React from "react";
import { useModal } from "@/context/ModalContext";
import ExampleModal from "./ExampleModal";
import AnotherModal from "./AnotherModal";

const ModalRenderer = () => {
  const { modalType, modalProps, closeModal } = useModal();

  if (!modalType) return null;

  return (
    <>
      <div className="">
        {modalType === "EXAMPLE_MODAL" && (
          <ExampleModal {...modalProps} onClose={closeModal} />
        )}
        {modalType === "ANOTHER_MODAL" && (
          <AnotherModal {...modalProps} onClose={closeModal} />
        )}
      </div>
    </>
  );
};

export default ModalRenderer;
