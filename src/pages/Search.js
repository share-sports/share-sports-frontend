import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search } from 'lucide-react';
import Kakao from '../components/Kakao';
// 샘플 데이터
const sampleFields = [
  { id: 1, name: 'A 구장', address: '서울시 강남구 역삼동 123', price: 50000 },
  { id: 2, name: 'B 구장', address: '서울시 서초구 서초동 456', price: 45000 },
  { id: 3, name: 'C 구장', address: '서울시 송파구 잠실동 789', price: 55000 },
  { id: 4, name: 'D 구장', address: '서울시 마포구 합정동 101', price: 40000 },
  { id: 5, name: 'E 구장', address: '서울시 영등포구 여의도동 202', price: 60000 },
];



export default function FieldBooking() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [fields, setFields] = useState(sampleFields);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredFields = sampleFields.filter((field) =>
      field.name.toLowerCase().includes(term.toLowerCase()) ||
      field.address.toLowerCase().includes(term.toLowerCase())
    );
    setFields(filteredFields);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <button onClick={() => navigate('/')} className="text-2xl font-bold">
              Share Sports
            </button>
            <div className="space-x-4">
              <button onClick={() => navigate('/login')} className="hover:underline">
                로그인
              </button>
              <button onClick={() => navigate('/signup')} className="hover:underline">
                회원가입
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">구장 예약</h1>
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="구장 검색"
            className="w-full pl-10 border border-gray-300 rounded py-2 px-4"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-[600px] bg-gray-200 flex items-center justify-center rounded-lg">
            {/* <span className="text-gray-500">지도 컴포넌트</span> */}
            <Kakao />
          </div>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {fields.map((field) => (
              <div key={field.id} className="border border-gray-300 rounded p-4 bg-white shadow">
                <div className="font-bold text-lg mb-2">{field.name}</div>
                <p className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  {field.address}
                </p>
                <p className="text-gray-700 mb-4">가격: 시간당 {field.price.toLocaleString()}원</p>
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  예약하기
                </button>
              </div>
            ))}
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
