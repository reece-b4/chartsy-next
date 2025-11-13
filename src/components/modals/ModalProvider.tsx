"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

type ModalOptions = {
  title?: ReactNode;
  content: ReactNode; // usually an imported component instance
  actions?: ReactNode;
};

// a context is a way to pass data through the component tree without having to pass props down manually at every level. (like a global state but here is used to replicate vue's event listener pattern for modals)

type ModalContextType = {
  openModal: (options: ModalOptions) => void;
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
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<ReactNode>(null);
  const [content, setContent] = useState<ReactNode>(null);
  const [actions, setActions] = useState<ReactNode>(null);

  const openModal = ({ title, content, actions }: ModalOptions) => {
    setTitle(title ?? null);
    setContent(content);
    setActions(actions ?? null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setContent(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {/* this children is rest of app as that is what is nested in ModalProvider in root layout */}
      {children}
      <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth="sm">
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent dividers>{content}</DialogContent>
        <DialogActions>
          {actions}
          <Button onClick={closeModal} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ModalContext.Provider>
  );
};
