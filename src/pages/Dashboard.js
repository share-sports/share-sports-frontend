import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <button onClick={() => navigate('/')} className="text-2xl font-bold">
              Share Sports
            </button>
            <div className="space-x-4">
              <button onClick={() => navigate('/profile')} className="hover:underline">
                프로필
              </button>
              <button onClick={() => navigate('/logout')} className="hover:underline">
                로그아웃
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">대시보드</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-gray-300 rounded p-4 bg-white shadow">
            <div className="border-b pb-2 mb-2">
              <h2 className="text-xl font-semibold">최근 예약</h2>
            </div>
            <div>
              <ul className="list-disc pl-5">
                <li>A 구장 - 2023-05-15 14:00</li>
                <li>B 구장 - 2023-05-18 16:00</li>
                <li>C 구장 - 2023-05-20 10:00</li>
              </ul>
            </div>
          </div>
          <div className="border border-gray-300 rounded p-4 bg-white shadow">
            <div className="border-b pb-2 mb-2">
              <h2 className="text-xl font-semibold">내 전적</h2>
            </div>
            <div>
              <p>승: 10</p>
              <p>패: 5</p>
              <p>승률: 66.67%</p>
            </div>
          </div>
          <div className="border border-gray-300 rounded p-4 bg-white shadow">
            <div className="border-b pb-2 mb-2">
              <h2 className="text-xl font-semibold">득점 현황</h2>
            </div>
            <div>
              <p>총 득점: 25</p>
              <p>경기당 평균 득점: 1.67</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-muted py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; 2023 풋살 매치. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
