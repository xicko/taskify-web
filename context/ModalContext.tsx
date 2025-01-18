import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";

type ModalType = "EXAMPLE_MODAL" | "ANOTHER_MODAL" | null;

interface ModalContextProps {
  openModal: (type: ModalType, props?: any) => void;
  closeModal: () => void;
  modalType: ModalType;
  modalProps: any;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalProps, setModalProps] = useState<any>({});

  const openModal = (type: ModalType, props: any = {}) => {
    setModalType(type);
    setModalProps(props);
  };

  const closeModal = () => {
    setModalType(null);
    setModalProps({});
  };

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, modalType, modalProps }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
