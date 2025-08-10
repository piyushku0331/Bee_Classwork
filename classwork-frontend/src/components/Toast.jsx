import React, { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg text-white ${type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}>
      {message}
    </div>
  );
};

export default Toast;
