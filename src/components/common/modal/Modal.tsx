import React, { useEffect } from "react";
import "./Modal.scss";

export interface ModalProps {
  isOpen: boolean;
  onBackClick: () => void;
  onKeyEcs: () => void;
}

const Modal: React.FC<ModalProps & React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const {
    isOpen,
    onBackClick,
    onKeyEcs,
  } = props;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.keyCode === 27 || e.key === "Escape") onKeyEcs();
    };
    isOpen && document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onKeyEcs]);

  const modalContent = (
    <div className="modal">
      <div className="modal__mask" onClick={onBackClick}></div>
      <div className="modal__content">{props.children}</div>
    </div>
  );

  return isOpen ? modalContent : null;
};

export { Modal };

