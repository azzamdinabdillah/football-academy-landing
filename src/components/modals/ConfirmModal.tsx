import React from 'react';
import ModalBase from './ModalBase';
import Button from '../Button';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: React.ReactNode;
  tagline?: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  tagline = "CONFIRMATION",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDanger = false
}: ConfirmModalProps) {
  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      tagline={tagline}
      title={title}
    >
      <div className="pt-2 space-y-5">
        {typeof message === 'string' ? (
          <p className="text-sm text-slate-600 leading-relaxed">
            {message}
          </p>
        ) : (
          message
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            variant="ghost"
            onClick={onClose}
            fullWidth
          >
            {cancelText}
          </Button>
          <Button
            variant="orange"
            onClick={onConfirm}
            fullWidth
            className={`rounded-xl py-3 ${
              isDanger 
                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20 border-none' 
                : ''
            }`}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </ModalBase>
  );
}
