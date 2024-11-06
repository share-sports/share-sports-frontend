import React, { useState } from 'react'
import { MapPin, Calendar, Users, Map, BookOpen, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Main() {
  const navigate = useNavigate()
  const [currentEvent, setCurrentEvent] = useState(0)

  const events = [
    { id: 1, title: '여름 풋살 대회', location: '서울시 강남구' },
    { id: 2, title: '초보자 풋살 교실', location: '서울시 마포구' },
    { id: 3, title: '풋살 친선 경기', location: '서울시 송파구' },
  ]

  const nextEvent = () => {
    setCurrentEvent((prev) => (prev + 1) % events.length)
  }

  const prevEvent = () => {
    setCurrentEvent((prev) => (prev - 1 + events.length) % events.length)
  }

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

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* <h1 className="text-4xl font-bold text-center mb-8">풋살의 모든 것</h1> */}

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
            onClick={() => navigate('/booking')}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Calendar className="w-12 h-12 mb-4 text-primary" />
            <span className="text-lg font-semibold">구장 예약</span>
          </button>
          <button
            onClick={() => navigate('/matching')}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Users className="w-12 h-12 mb-4 text-primary" />
            <span className="text-lg font-semibold">팀 매칭</span>
          </button>
          <button // 현재 주변 구장 기능(/map) 대신 구장 리스트 띄움(/search)
            onClick={() => navigate('/search')} 
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Map className="w-12 h-12 mb-4 text-primary" />
            <span className="text-lg font-semibold">주변 구장</span>
          </button>
          <button
            onClick={() => navigate('/guide')}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
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
                src={`/placeholder.svg?height=384&width=768&text=${events[currentEvent].title}`}
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

      <footer className="bg-muted py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; 2023 풋살 매치. All rights reserved.
        </div>
      </footer>
    </div>
  )
}