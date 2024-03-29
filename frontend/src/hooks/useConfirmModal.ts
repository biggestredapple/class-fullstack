import { useState } from 'react';

export const useConfirmModal = () => {
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  const show = () => {
    setIsShowing(true);
  };

  const close = () => {
    setIsShowing(false);
  };

  const confirm = () => {
    setIsConfirm(true);
    close();
  }

  return {
    isShowing,
    isConfirm,
    show,
    close,
    confirm
  };
}