import React from 'react';
import { Button } from './button';
import ReactDOM from "react-dom";
import './../styles/confirmationModal.scss';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmLabel: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel,
}) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className='confirmationModal-overlay'>
            <div className='confirmationModal-container'>
                <h2 className='confirmationModal-header'>{title}</h2>
                <p className='confirmationModal-text'>{message}</p>
                <Button label={confirmLabel} onClick={() => {
                    onConfirm();
                    onClose();
                }} className='confirmationModal-button' />
            </div>
        </div>,
        document.body
    );
};
