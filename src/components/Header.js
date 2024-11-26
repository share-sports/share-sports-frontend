import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // 모바일 메뉴 토글 상태

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
    <header className="bg-primary text-primary-foreground py-3 px-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="text-lg font-bold text-primary-foreground"
        >
          Share Sports
        </button>

        {/* 햄버거 메뉴 (모바일) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="block md:hidden p-2 rounded-md focus:outline-none"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* 데스크탑 네비게이션 */}
        <div className="hidden md:flex space-x-4">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => navigate('/mypage')}
                className="hover:bg-primary-foreground hover:text-primary px-3 py-2 rounded-md text-sm"
              >
                마이페이지
              </button>
              <button
                onClick={handleLogout}
                className="hover:bg-primary-foreground hover:text-primary px-3 py-2 rounded-md text-sm"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="hover:bg-primary-foreground hover:text-primary px-3 py-2 rounded-md text-sm"
              >
                로그인
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="hover:bg-primary-foreground hover:text-primary px-3 py-2 rounded-md text-sm"
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div className="md:hidden mt-2 bg-white shadow-md rounded-md">
          <div className="flex flex-col space-y-2 py-4 px-4">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    navigate('/mypage');
                    setMenuOpen(false);
                  }}
                  className="text-left hover:bg-gray-100 px-3 py-2 rounded-md text-sm"
                >
                  마이페이지
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="text-left hover:bg-gray-100 px-3 py-2 rounded-md text-sm"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate('/login');
                    setMenuOpen(false);
                  }}
                  className="text-left hover:bg-gray-100 px-3 py-2 rounded-md text-sm"
                >
                  로그인
                </button>
                <button
                  onClick={() => {
                    navigate('/signup');
                    setMenuOpen(false);
                  }}
                  className="text-left hover:bg-gray-100 px-3 py-2 rounded-md text-sm"
                >
                  회원가입
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
