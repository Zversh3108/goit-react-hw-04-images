import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';
const modalRoot = document.querySelector('#modal-root');

export function Modal(props) {
  const { onClose = () => {} } = props;

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };
  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };
  const { imageURL, tags } = props;

  return createPortal(
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img src={imageURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
}
Modal.propTypes = {
  imageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};
