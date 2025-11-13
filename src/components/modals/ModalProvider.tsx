"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";

// a context is a way to pass data through the component tree without having to pass props down manually at every level. (like a global state but here is used to replicate vue's event listener pattern for modals)

type ModalContextType = {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
};


const ModalContext = createContext<ModalContextType | undefined>(undefined);

// this function is imported and called in any component to have access to openModal and closeModal functions
export const useModal = () => {
  // ctx is the value provided by ModelContext.Provider and contains openModal and closeModal functions as well as
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return ctx;
};

type ModalProviderProps = {
  children: ReactNode;
};

// this component wraps the app in layout.tsx to provide modal context to all components
export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [content, setContent] = useState<ReactNode | null>(null);

  const openModal = (newContent: ReactNode) => {
    setContent(newContent);
  };

  const closeModal = () => {
    setContent(null);
  };

  const isOpen = content !== null;

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {isOpen && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: "16px",
              borderRadius: "8px",
              minWidth: "280px",
            }}
          >
            {content}
            <button onClick={closeModal} style={{ marginTop: "12px" }}>
              Close
            </button>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};