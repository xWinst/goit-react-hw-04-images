import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
    useEffect(() => {
        window.addEventListener('keydown', closeModal);
        return () => window.removeEventListener('keydown', closeModal);
    });

    const closeModal = event => {
        if (event.code === 'Escape') {
            onClose();
        }
    };

    const onClick = event => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div className={s.overlay} onClick={onClick}>
            <div className={s.modal}>{children}</div>
        </div>,
        modalRoot
    );
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};

export default Modal;
