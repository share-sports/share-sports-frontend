import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <header className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold"
          >
            Share Sports
          </button>
          <div className="space-x-4">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate('/mypage')}
                  className="hover:bg-primary-foreground hover:text-primary p-2"
                >
                  마이페이지
                </button>
                <button
                  onClick={handleLogout}
                  className="hover:bg-primary-foreground hover:text-primary p-2"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="hover:bg-primary-foreground hover:text-primary p-2"
                >
                  로그인
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="hover:bg-primary-foreground hover:text-primary p-2"
                >
                  회원가입
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
