import React, { useState } from 'react';

export const DropdownMenu = ({ children, triggerText }) => {
  const [isOpen, setIsOpen] = useState(false);
  let timeoutId = null;

  const openDropdown = () => {
    clearTimeout(timeoutId);
    setIsOpen(true);
  };

  const closeDropdown = () => {
    timeoutId = setTimeout(() => setIsOpen(false), 200); // 지연 시간 설정
  };

  return React.createElement(
    'div',
    {
      className: 'relative inline-block text-left',
      onMouseEnter: openDropdown,
      onMouseLeave: closeDropdown
    },
    React.createElement(
      'button',
      { className: 'hover:bg-primary-foreground hover:text-primary p-2' },
      triggerText
    ),
    isOpen &&
      React.createElement(
        'div',
        { className: 'absolute right-0 mt-2 bg-white rounded-md shadow-lg z-10 w-auto min-w-[8rem]' },
        children
      )
  );
};
