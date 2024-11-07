import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, MapPin, Phone, Calendar } from 'lucide-react'

// Mock data to simulate the stadium information
const stadiumData = {
  id: 1,
  stadiumUuid: "123e4567-e89b-12d3-a456-426614174000",
  hostUuid: "987e6543-e21b-12d3-a456-426614174000",
  name: "풋살 파크",
  address: "서울특별시 강남구 테헤란로 123",
  phone: "02-1234-5678",
  description: "최신 시설을 갖춘 실내 풋살장입니다. 쾌적한 환경에서 즐거운 경기를 즐겨보세요.",
  detailedInfo: `
    • 구장 크기: 40m x 20m (8v8 경기 가능)
    • 바닥 재질: 최신 인조잔디 (FIFA 품질인증)
    • 조명 시설: LED 조명 (야간 경기 가능)
    • 편의 시설: 남/여 구분 샤워실, 락커룸, 휴게 공간
    • 주차: 지하 주차장 이용 가능 (2시간 무료)
    • 특이 사항: 
      - 전문 코치 상주 (개인/팀 레슨 가능, 별도 문의)
      - 매월 첫째 주 토요일 아마추어 대회 개최
      - 구장 내 스포츠 용품점 입점 (풋살화, 유니폼 등 구매 가능)
  `,
  parking: true,
  shoeRent: true,
  ballRent: true,
  uniformRent: false,
  rentCost: 80000,
  openingHours: "09:00",
  closingHours: "22:00",
  deleted: false,
  image: "https://example.com/image.jpg" // 경기장 이미지 URL을 추가합니다.
}

export default function StadiumDetailPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <button onClick={() => navigate('/')} className="text-2xl font-bold">
              Share Sports
            </button>
            <div className="space-x-4">
              <button onClick={() => navigate('/dashboard')} className="hover:underline">
                대시보드
              </button>
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

      {/* 이미지 섹션 */}
      <div
        className="w-full h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${stadiumData.image})` }}
      >
        <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">{stadiumData.name}</h1>
        </div>
      </div>

      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">{stadiumData.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-300 rounded p-4 bg-white shadow md:col-span-2">
            <div className="pb-2 mb-2 border-b">
              <h2 className="text-xl font-semibold">구장 정보</h2>
              <p className="text-sm text-muted-foreground">{stadiumData.description}</p>
            </div>
            <div className="space-y-2">
              <p className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" /> {stadiumData.address}
              </p>
              <p className="flex items-center">
                <Phone className="mr-2 h-4 w-4" /> {stadiumData.phone}
              </p>
              <p className="flex items-center">
                <Clock className="mr-2 h-4 w-4" /> 영업시간: {stadiumData.openingHours} - {stadiumData.closingHours}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t">
              <h3 className="text-lg font-semibold mb-2">상세 정보</h3>
              <pre className="whitespace-pre-wrap text-sm text-muted-foreground">{stadiumData.detailedInfo}</pre>
            </div>
          </div>
          <div className="border border-gray-300 rounded p-4 bg-white shadow">
            <div className="pb-2 mb-2 border-b">
              <h2 className="text-xl font-semibold">시설 및 대여</h2>
            </div>
            <div className="space-y-2">
              <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded ${stadiumData.parking ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                🚗 주차
              </span>
              <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded ${stadiumData.shoeRent ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                👟 신발 대여
              </span>
              <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded ${stadiumData.ballRent ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                ⚽ 공 대여
              </span>
              <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded ${stadiumData.uniformRent ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                👕 유니폼 대여
              </span>
              <p className="mt-4">대여 비용: {stadiumData.rentCost.toLocaleString()}원</p>
            </div>
            <div className="mt-6">
              <button 
                className="w-full py-6 text-lg bg-primary text-primary-foreground rounded hover:bg-primary-dark flex items-center justify-center"
                onClick={() => navigate(`/booking/${stadiumData.stadiumUuid}`)}
              >
                <Calendar className="mr-2 h-5 w-5" />
                예약하기
              </button>
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
