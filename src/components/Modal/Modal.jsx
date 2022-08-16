import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends React.Component {
    componentDidMount() {
        window.addEventListener('keydown', this.closeModal);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.closeModal);
    }

    closeModal = event => {
        if (event.code === 'Escape') {
            this.props.onClose();
        }
    };

    onClick = event => {
        if (event.target === event.currentTarget) {
            this.props.onClose();
        }
    };

    render() {
        return createPortal(
            <div className={s.overlay} onClick={this.onClick}>
                <div className={s.modal}>{this.props.children}</div>
            </div>,
            modalRoot
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};
