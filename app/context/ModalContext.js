import React, { createContext, useEffect, useState } from "react";

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalState, setModalState] = useState({
    superHighPriorityModal: {
      visible: false,
      priority: "high",
    },
    highPriorityModal: {
      visible: false,
      priority: "high",
    },
    midPriorityModal: {
      visible: false,
      priority: "mid",
    },
    lowPriorityModal: {
      visible: false,
      priority: "low",
    },
    superLowPriorityModal: {
      visible: false,
      priority: "low",
    },
  });

  const handleOpenModal = (priority) => {
    switch (priority) {
      case "superHighPriorityModal":
        if (
          modalState.highPriorityModal.visible ||
          modalState.midPriorityModal.visible ||
          modalState.lowPriorityModal.visible ||
          modalState.superLowPriorityModal.visible
        ) {
          handleCloseModal("highPriorityModal");
          handleCloseModal("midPriorityModal");
          handleCloseModal("lowPriorityModal");
          handleCloseModal("superLowPriorityModal");
          setTimeout(() => {
            setModalState({
              ...modalState,
              [priority]: {
                visible: true,
              },
            });
          }, 200);
        } else {
          setModalState({
            ...modalState,
            [priority]: {
              visible: true,
            },
          });
        }
        break;
      case "highPriorityModal":
        if (
          modalState.midPriorityModal.visible ||
          modalState.lowPriorityModal.visible ||
          modalState.superLowPriorityModal.visible
        ) {
          handleCloseModal("midPriorityModal");
          handleCloseModal("lowPriorityModal");
          handleCloseModal("superLowPriorityModal");
          setTimeout(() => {
            setModalState({
              ...modalState,
              [priority]: {
                visible: true,
              },
            });
          }, 200);
        } else {
          setModalState({
            ...modalState,
            [priority]: {
              visible: true,
            },
          });
        }
        break;
      case "midPriorityModal":
        if (
          modalState.lowPriorityModal.visible ||
          modalState.superLowPriorityModal.visible
        ) {
          handleCloseModal("lowPriorityModal");
          handleCloseModal("superLowPriorityModal");
          setTimeout(() => {
            setModalState({
              ...modalState,
              [priority]: {
                visible: true,
              },
            });
          }, 200);
        } else {
          setModalState({
            ...modalState,
            [priority]: {
              visible: true,
            },
          });
        }
        break;
      case "lowPriorityModal":
        if (modalState.superLowPriorityModal.visible) {
          handleCloseModal("superLowPriorityModal");
          setTimeout(() => {
            setModalState({
              ...modalState,
              [priority]: {
                visible: true,
              },
            });
          }, 200);
        } else {
          setModalState({
            ...modalState,
            [priority]: {
              visible: true,
            },
          });
        }
        break;
      case "superLowPriorityModal":
        setModalState({
          ...modalState,
          [priority]: {
            visible: true,
          },
        });
        break;
    }
  };

  const handleCloseModal = (priority) => {
    setModalState({
      ...modalState,
      [priority]: {
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
