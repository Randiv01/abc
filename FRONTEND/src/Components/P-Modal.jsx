import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import '../styles/P-Modal.css';
const Modal = ({
  title,
  children,
  onClose,
  className = ''
}) => {
  useEffect(() => {
    const handleEscKey = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className={`modal ${className}`} role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="close-button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>;
};
export default Modal;