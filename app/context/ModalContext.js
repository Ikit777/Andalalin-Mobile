import React, { createContext, useEffect, useState } from "react";
import { get, remove, store } from "../utils/local-storage";

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalState, setModalState] = useState({
    NoInternetModal: {
      visible: false,
      priority: "super high",
    },
    UpdateModal: {
      visible: false,
      priority: "high",
    },
    ServerModal: {
      visible: false,
      priority: "high",
    },
    SessionModal: {
      visible: false,
      priority: "high",
    },
    AccountModal: {
      visible: false,
      priority: "high",
    },
    ConfirmationModal: {
      visible: false,
      priority: "low",
    },
    DialogModal: {
      visible: false,
      priority: "low",
    },
  });

  const handleOpenModal = async (modal) => {
    const currentModal = modalState[modal];

    switch (currentModal.priority) {
      case "super high":
        const updatedModalState = Object.fromEntries(
          Object.entries(modalState).map(([key, value]) => {
            if (value.visible) {
              if (
                value.priority == "low" ||
                value.priority == "mid" ||
                value.priority == "high"
              ) {
                return [
                  key,
                  { ...value, visible: false, priority: value.priority },
                ];
              }
            }
            return [key, value];
          })
        );
        setTimeout(() => {
          setModalState({
            ...updatedModalState,
            [modal]: {
              priority: currentModal.priority,
              visible: true,
            },
          });
        }, 200);
        break;
      case "high":
        break;
      case "mid":
        break;
      case "low":
        setModalState({
          ...modalState,
          [modal]: {
            priority: currentModal.priority,
            visible: true,
          },
        });
        break;
    }
  };

  const handleCloseModal = (modal) => {
    const currentModal = modalState[modal];
    setModalState({
      ...modalState,
      [modal]: {
        priority: currentModal.priority,
        visible: false,
      },
    });
  };

  return (
    <ModalContext.Provider
      value={{
        modalState,
        handleOpenModal,
        handleCloseModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
