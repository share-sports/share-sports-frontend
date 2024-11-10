'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { MapPin, Calendar, Users, BookOpen, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import event1 from '../assets/event1.jpg';

export default function Main() {
  const navigate = useNavigate();
  const [currentEvent, setCurrentEvent] = useState(0);
  const [showUnavailableModal, setShowUnavailableModal] = useState(false);
  const [showLoginWarning, setShowLoginWarning] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const events = [
    { id: 1, title: '여름 풋살 대회', location: '서울시 강남구' },
    { id: 2, title: '초보자 풋살 교실', location: '서울시 마포구' },
    { id: 3, title: '풋살 친선 경기', location: '서울시 송파구' }
  ];

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsLoggedIn(!!accessToken);
  }, []);

  const nextEvent = () => {
    setCurrentEvent((prev) => (prev + 1) % events.length);
  };

  const prevEvent = () => {
    setCurrentEvent((prev) => (prev - 1 + events.length) % events.length);
  };

  const handleUnavailableFeature = () => {
    setShowUnavailableModal(true);
  };

  const handleDashboardClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      setShowLoginWarning(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="구장 또는 지역 검색"
            className="w-full p-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <button
            onClick={handleDashboardClick}
            className="flex flex-col items-center p-6 h-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Calendar className="w-12 h-12 mb-4 text-primary" />
            <span className="text-lg font-semibold">대시보드</span>
          </button>
          <button
            onClick={handleUnavailableFeature}
            className="flex flex-col items-center p-6 h-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Users className="w-12 h-12 mb-4 text-primary" />
            <span className="text-lg font-semibold">팀 매칭</span>
          </button>
          <button
            onClick={() => navigate('/search')}
            className="flex flex-col items-center p-6 h-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <MapPin className="w-12 h-12 mb-4 text-primary" />
            <span className="text-lg font-semibold">주변 구장</span>
          </button>
          <button
            onClick={() => navigate('/guide')}
            className="flex flex-col items-center p-6 h-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <BookOpen className="w-12 h-12 mb-4 text-primary" />
            <span className="text-lg font-semibold">가이드</span>
          </button>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">이벤트</h2>
          <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-96 bg-gray-200 relative">
              <img
                src={event1}
                alt={events[currentEvent].title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={prevEvent}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextEvent}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{events[currentEvent].title}</h3>
              <p className="text-gray-600 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {events[currentEvent].location}
              </p>
            </div>
            <div className="flex justify-center pb-4">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentEvent(index)}
                  className={`w-3 h-3 rounded-full mx-1 ${
                    index === currentEvent ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Unavailable Feature Modal */}
      <dialog open={showUnavailableModal} className="rounded-lg p-6 max-w-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">해당 기능은 아직 사용할 수 없습니다.</h2>
        <p className="mb-6 text-gray-600">
          현재 개발 중인 기능입니다. 곧 이용하실 수 있도록 준비 중이니 조금만 기다려 주세요!
        </p>
        <button
          onClick={() => setShowUnavailableModal(false)}
          className="bg-primary text-black px-6 py-2 rounded-md shadow-lg hover:bg-primary-dark"
        >
          닫기
        </button>
      </dialog>

      {/* Login Warning Modal */}
      <dialog open={showLoginWarning} className="rounded-lg p-6 max-w-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">로그인이 필요합니다</h2>
        <p className="mb-6 text-gray-600">
          대시보드는 로그인 후 사용할 수 있습니다. 로그인 페이지로 이동하시겠습니까?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowLoginWarning(false)}
            className="px-4 py-2 rounded-md border border-gray-400 hover:bg-gray-100"
          >
            취소
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-black px-6 py-2 rounded-md shadow-lg hover:bg-primary-dark"
          >
            로그인 페이지로 이동
          </button>
        </div>
      </dialog>
    </div>
  );
}
