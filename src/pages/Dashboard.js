import React from 'react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">대시보드</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border border-gray-300 rounded p-4 bg-white shadow">
          <h2 className="text-lg font-semibold">최근 예약</h2>
          <ul className="list-disc pl-5 mt-2">
            <li>A 구장 - 2023-05-15 14:00</li>
            <li>B 구장 - 2023-05-18 16:00</li>
            <li>C 구장 - 2023-05-20 10:00</li>
          </ul>
        </div>
        <div className="border border-gray-300 rounded p-4 bg-white shadow">
          <h2 className="text-lg font-semibold">내 전적</h2>
          <p>승: 10</p>
          <p>패: 5</p>
          <p>승률: 66.67%</p>
        </div>
        <div className="border border-gray-300 rounded p-4 bg-white shadow">
          <h2 className="text-lg font-semibold">득점 현황</h2>
          <p>총 득점: 25</p>
          <p>경기당 평균 득점: 1.67</p>
        </div>
      </div>
    </div>
  );
}
