'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, BookOpen, Search } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
import event1 from '../assets/event1.jpg';
import event2 from '../assets/event2.jpg';
import event3 from '../assets/event3.jpg';
import Header from '../components/Header';

export default function Main() {
  const navigate = useNavigate();
  const [currentEvent, setCurrentEvent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showMoreLeagues, setShowMoreLeagues] = useState(false);

  const events = [
    { id: 1, title: '여름 풋살 대회', location: '서울시 강남구', image: event1 },
    { id: 2, title: '초보자 풋살 교실', location: '서울시 마포구', image: event2 },
    { id: 3, title: '풋살 친선 경기', location: '서울시 송파구', image: event3 },
  ];

  const leagues = [
    { id: 1, name: '[공식] 12 / 18 쉐어스포츠 공식 리그', description: '서울 지역 풋살 리그' },
    { id: 2, name: '[공식] 12 / 25 쉐어스포츠 공식 리그', description: '경기 지역 풋살 리그' },
    { id: 3, name: '양주시청배 유소년 풋살 리그', description: '부산 지역 풋살 리그' },
    { id: 4, name: '[공식] 쉐어스포츠 공식 리그', description: '인천 지역 풋살 리그' },
    { id: 5, name: '[공식] 쉐어스포츠 공식 리그', description: '대전 지역 풋살 리그' },
  ];

  const handleSwipe = (direction) => {
    if (isAnimating) return; // 애니메이션 중일 때는 무시
    if (direction === 'LEFT') moveToNext();
    if (direction === 'RIGHT') moveToPrevious();
  };

  const moveToNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentEvent((prev) => (prev + 1) % events.length);
      setIsAnimating(false);
    }, 300); // 애니메이션 지속 시간과 동기화
  };

  const moveToPrevious = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentEvent((prev) => (prev - 1 + events.length) % events.length);
      setIsAnimating(false);
    }, 300); // 애니메이션 지속 시간과 동기화
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('LEFT'),
    onSwipedRight: () => handleSwipe('RIGHT'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="구장 또는 지역 검색"
            className="w-full p-3 pr-10 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* 기존 버튼 섹션 */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => navigate('/mypage')}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Calendar className="w-8 h-8 mb-2 text-primary" />
            <span className="text-sm font-semibold">마이페이지</span>
          </button>
          <button
            onClick={() => alert('팀 매칭 기능 준비 중입니다.')}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Users className="w-8 h-8 mb-2 text-primary" />
            <span className="text-sm font-semibold">팀 매칭</span>
          </button>
          <button
            onClick={() => navigate('/search')}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <MapPin className="w-8 h-8 mb-2 text-primary" />
            <span className="text-sm font-semibold">주변 구장</span>
          </button>
          <button
            onClick={() => navigate('/guide')}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <BookOpen className="w-8 h-8 mb-2 text-primary" />
            <span className="text-sm font-semibold">가이드</span>
          </button>
        </div>

        {/* 리그 정보 섹션 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">리그 정보</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(showMoreLeagues ? leagues : leagues.slice(0, 3)).map((league) => (
              <div
                key={league.id}
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-md font-semibold mb-2">{league.name}</h3>
                <p className="text-sm text-gray-600">{league.description}</p>
              </div>
            ))}
          </div>
          {!showMoreLeagues && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowMoreLeagues(true)}
                className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                더보기
              </button>
            </div>
          )}
        </div>

        {/* 이벤트 섹션 */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">이벤트</h2>
          <div
            className="relative overflow-hidden"
            {...handlers} // 드래그 핸들러 추가
          >
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentEvent * 100}%)`, // 슬라이드 위치 계산
              }}
            >
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className="w-full flex-shrink-0 h-64 bg-gray-200"
                  style={{ minWidth: '100%' }} // 각 슬라이드가 화면 크기를 차지하도록 설정
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="p-4 bg-white">
                    <h3 className="text-md font-semibold mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 네비게이션 버튼 */}
            <button
              onClick={moveToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white z-10"
            >
              ◀
            </button>
            <button
              onClick={moveToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white z-10"
            >
              ▶
            </button>
          </div>

          {/* 인디케이터 */}
          <div className="flex justify-center mt-4 space-x-2">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => !isAnimating && setCurrentEvent(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentEvent ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
