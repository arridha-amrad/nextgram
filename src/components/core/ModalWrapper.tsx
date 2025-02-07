"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  closeModal: VoidFunction;
  children: ReactNode;
};

const Modal = ({ closeModal, children }: Props) => {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        onClick={closeModal}
        className="bg-background/30 absolute inset-0 backdrop-blur-xs"
      />
      <div className="fixed top-4 right-4">
        <button onClick={closeModal}>
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      {children}
    </div>,
    document.body,
  );
};

export default Modal;
