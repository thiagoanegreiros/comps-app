import React from 'react';
import type { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  isModal?: boolean;
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  isModal = true,
  header,
  body,
  footer,
}) => {
  if (!isOpen) return null;

  const dialogContent = isModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          &times;
        </button>
        {header && <div className="mb-4">{header}</div>}
        {body && <div className="mb-4">{body}</div>}
        {footer && <div>{footer}</div>}
      </div>
    </div>
  ) : (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          &times;
        </button>
        {header && <div className="mb-4">{header}</div>}
        {body && <div className="mb-4">{body}</div>}
        {footer && <div>{footer}</div>}
      </div>
    </div>
  );

  return ReactDOM.createPortal(dialogContent, document.body);
};
