import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import {
  CloseModalButton,
  ModalBody,
  ModalContainer,
  ModalOverlay
} from "./modal.style";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  hasCloseBtn?: boolean;
  closeOnOutsideClick?: boolean;
  width?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  hasCloseBtn = true,
  closeOnOutsideClick = false,
  width
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (closeOnOutsideClick && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      if (closeOnOutsideClick) {
        document.addEventListener("mousedown", handleClickOutside);
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, closeOnOutsideClick]);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer $width={width} ref={modalRef} role="dialog" aria-modal="true">
        {hasCloseBtn && (
          <CloseModalButton onClick={onClose} aria-label="Fechar modal">
            <X />
          </CloseModalButton>
        )}
        <ModalBody>{children}</ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;