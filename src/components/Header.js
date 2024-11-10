import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu } from './DropdownMenu';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsLoggedIn(!!accessToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  return React.createElement(
    'header',
    { className: 'bg-primary text-primary-foreground py-4' },
    React.createElement(
      'div',
      { className: 'container mx-auto px-4' },
      React.createElement(
        'nav',
        { className: 'flex justify-between items-center' },
        React.createElement(
          'button',
          {
            onClick: () => navigate('/'),
            className: 'text-2xl font-bold'
          },
          'Share Sports'
        ),
        React.createElement(
          'div',
          { className: 'space-x-4' },
          isLoggedIn
            ? React.createElement(
                React.Fragment,
                null,
                React.createElement(
                  DropdownMenu,
                  { triggerText: '마이페이지' },
                  React.createElement(
                    'button',
                    {
                      onClick: () => navigate('/dashboard'),
                      className: 'block w-full text-left px-4 py-2 hover:bg-gray-100'
                    },
                    '대시보드'
                  ),
                  React.createElement(
                    'button',
                    {
                      onClick: () => navigate('/stat'),
                      className: 'block w-full text-left px-4 py-2 hover:bg-gray-100'
                    },
                    '나의 통계'
                  ),
                  React.createElement(
                    'button',
                    {
                      onClick: () => navigate('/replay'),
                      className: 'block w-full text-left px-4 py-2 hover:bg-gray-100'
                    },
                    '리플레이'
                  )
                ),
                React.createElement(
                  'button',
                  {
                    onClick: handleLogout,
                    className: 'hover:bg-primary-foreground hover:text-primary p-2'
                  },
                  '로그아웃'
                )
              )
            : React.createElement(
                React.Fragment,
                null,
                React.createElement(
                  'button',
                  {
                    onClick: () => navigate('/login'),
                    className: 'hover:bg-primary-foreground hover:text-primary p-2'
                  },
                  '로그인'
                ),
                React.createElement(
                  'button',
                  {
                    onClick: () => navigate('/signup'),
                    className: 'hover:bg-primary-foreground hover:text-primary p-2'
                  },
                  '회원가입'
                )
              )
        )
      )
    )
  );
};

export default Header;
