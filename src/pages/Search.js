'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Header 컴포넌트 임포트

export default function FieldBooking() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [fields, setFields] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStadiums();
  }, []);

  const fetchStadiums = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://chaeseungji.iptime.org:25565/api/stadium/list');
      if (!response.ok) {
        throw new Error('Failed to fetch stadiums');
      }
      const data = await response.json();
      if (data.isSuccess) {
        setFields(data.result);
      } else {
        throw new Error(data.message || 'Failed to fetch stadiums');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const filteredFields = fields.filter((field) =>
    field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    field.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header /> {/* Header 컴포넌트 사용 */}

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
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-[600px] bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-gray-500">지도 컴포넌트</span>
            {/* <Kakao /> */}
          </div>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : (
              filteredFields.map((field) => (
                <div key={field.stadiumUuid} className="border border-gray-300 rounded p-4 bg-white shadow">
                  <div className="font-bold text-lg mb-2">{field.name}</div>
                  <p className="flex items-center text-gray-600 mb-2">📍 {field.address}</p>
                  <p className="flex items-center text-gray-600 mb-2">📞 {field.phone}</p>
                  <p className="flex items-center text-gray-600 mb-2">
                    🕒 {field.openingHours} - {field.closingHours}
                  </p>
                  <p className="text-gray-700 mb-2">{field.description}</p>
                  <div className="flex space-x-2 mb-4">
                    {field.parking && <span title="주차 가능">🚗</span>}
                    {field.shoeRent && <span title="신발 대여 가능">👟</span>}
                    {field.ballRent && <span title="공 대여 가능">⚽</span>}
                    {field.uniformRent && <span title="유니폼 대여 가능">👕</span>}
                  </div>
                  <p className="text-gray-700 mb-4">대여 비용: {field.rentCost.toLocaleString()}원</p>
                  <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    예약하기
                  </button>
                </div>
              ))
            )}
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
