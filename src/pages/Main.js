'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Header 컴포넌트 임포트
import { MapPin, Calendar, Users, Map, BookOpen, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import event1 from '../assets/event1.jpg';

const Main = () => {
  const navigate = useNavigate();
  const [currentEvent, setCurrentEvent] = useState(0);
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태

  const events = [
    { id: 1, title: '여름 풋살 대회', location: '서울시 강남구' },
    { id: 2, title: '초보자 풋살 교실', location: '서울시 마포구' },
    { id: 3, title: '풋살 친선 경기', location: '서울시 송파구' }
  ];

  const nextEvent = () => {
    setCurrentEvent((prev) => (prev + 1) % events.length);
  };

  const prevEvent = () => {
    setCurrentEvent((prev) => (prev - 1 + events.length) % events.length);
  };

  const handleUnavailableFeature = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return React.createElement(
    'div',
    { className: 'flex flex-col min-h-screen bg-background' },
    React.createElement(Header, null),
    React.createElement(
      'main',
      { className: 'flex-grow container mx-auto px-4 py-8' },
      React.createElement(
        'div',
        { className: 'relative mb-8' },
        React.createElement('input', {
          type: 'text',
          placeholder: '구장 또는 지역 검색',
          className: 'w-full p-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
        }),
        React.createElement(Search, {
          className: 'absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400'
        })
      ),
      React.createElement(
        'div',
        { className: 'grid grid-cols-2 md:grid-cols-4 gap-6 mb-12' },
        React.createElement(
          'button',
          {
            onClick: handleUnavailableFeature, // 개발 중 기능 클릭 시 모달 표시
            className: 'flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow'
          },
          React.createElement(Calendar, { className: 'w-12 h-12 mb-4 text-primary' }),
          React.createElement('span', { className: 'text-lg font-semibold' }, '구장 예약')
        ),
        React.createElement(
          'button',
          {
            onClick: handleUnavailableFeature, // 개발 중 기능 클릭 시 모달 표시
            className: 'flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow'
          },
          React.createElement(Users, { className: 'w-12 h-12 mb-4 text-primary' }),
          React.createElement('span', { className: 'text-lg font-semibold' }, '팀 매칭')
        ),
        React.createElement(
          'button',
          {
            onClick: () => navigate('/search'),
            className: 'flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow'
          },
          React.createElement(MapPin, { className: 'w-12 h-12 mb-4 text-primary' }),
          React.createElement('span', { className: 'text-lg font-semibold' }, '주변 구장')
        ),
        React.createElement(
          'button',
          {
            onClick: () => navigate('/guide'),
            className: 'flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow'
          },
          React.createElement(BookOpen, { className: 'w-12 h-12 mb-4 text-primary' }),
          React.createElement('span', { className: 'text-lg font-semibold' }, '가이드')
        )
      ),
      React.createElement(
        'div',
        { className: 'mt-12' },
        React.createElement('h2', { className: 'text-2xl font-semibold mb-4' }, '이벤트'),
        React.createElement(
          'div',
          { className: 'relative bg-white rounded-lg shadow-md overflow-hidden' },
          React.createElement(
            'div',
            { className: 'h-96 bg-gray-200 relative' },
            React.createElement('img', {
              src: event1,
              alt: events[currentEvent].title,
              className: 'w-full h-full object-cover'
            }),
            React.createElement(
              'button',
              {
                onClick: prevEvent,
                className: 'absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white'
              },
              React.createElement(ChevronLeft, { className: 'w-6 h-6' })
            ),
            React.createElement(
              'button',
              {
                onClick: nextEvent,
                className: 'absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white'
              },
              React.createElement(ChevronRight, { className: 'w-6 h-6' })
            )
          ),
          React.createElement(
            'div',
            { className: 'p-6' },
            React.createElement('h3', { className: 'text-xl font-semibold mb-2' }, events[currentEvent].title),
            React.createElement(
              'p',
              { className: 'text-gray-600 flex items-center' },
              React.createElement(MapPin, { className: 'w-5 h-5 mr-2' }),
              events[currentEvent].location
            )
          ),
          React.createElement(
            'div',
            { className: 'flex justify-center pb-4' },
            events.map((_, index) =>
              React.createElement('button', {
                key: index,
                onClick: () => setCurrentEvent(index),
                className: `w-3 h-3 rounded-full mx-1 ${index === currentEvent ? 'bg-primary' : 'bg-gray-300'}`
              })
            )
          )
        )
      ),
      showModal &&
        React.createElement(
          'div',
          { className: 'fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50' },
          React.createElement(
            'div',
            { className: 'bg-white rounded-lg shadow-lg p-6 max-w-md text-center relative' },
            React.createElement(
              'h2',
              { className: 'text-2xl font-semibold mb-4' },
              '해당 기능은 아직 사용할 수 없습니다.'
            ),
            React.createElement(
              'p',
              { className: 'mb-6 text-gray-600' },
              '현재 개발 중인 기능입니다. 곧 이용하실 수 있도록 준비 중이니 조금만 기다려 주세요!'
            ),
            React.createElement(
              'button',
              {
                onClick: closeModal,
                className: 'mt-4 bg-primary text-black px-6 py-2 rounded-md shadow-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
              },
              '닫기'
            )
          )
        )
    )
  );
};

export default Main;
