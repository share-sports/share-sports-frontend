import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, MapPin, Phone, Calendar } from 'lucide-react';
import Header from '../components/Header'; // Header 컴포넌트 임포트

export default function StadiumDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [stadiumData, setStadiumData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL 쿼리 파라미터에서 stadiumUuid 추출
  const searchParams = new URLSearchParams(location.search);
  const stadiumUuid = searchParams.get('stadiumUuid');

  useEffect(() => {
    if (stadiumUuid) {
      fetchStadiumData();
    }
  }, [stadiumUuid]);

  const fetchStadiumData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://chaeseungji.iptime.org:25565/api/stadium/${stadiumUuid}`);
      if (!response.ok) {
        throw new Error('Failed to fetch stadium data');
      }
      const data = await response.json();
      if (data.isSuccess) {
        setStadiumData(data.result);
      } else {
        throw new Error(data.message || 'Failed to load stadium data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  if (!stadiumData) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header /> {/* Header 컴포넌트를 사용 */}
      
      {/* 이미지 섹션 */}
      <div
        className="w-full h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${stadiumData.image || 'https://example.com/default-image.jpg'})` }}
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
          </div>
          <div className="border border-gray-300 rounded p-4 bg-white shadow">
            <div className="pb-2 mb-2 border-b">
              <h2 className="text-xl font-semibold">시설 및 대여</h2>
            </div>
            <div className="space-y-2">
              <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded ${stadiumData.parking ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                주차 가능
              </span>
              <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded ${stadiumData.shoeRent ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                신발 대여 가능
              </span>
              <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded ${stadiumData.ballRent ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                공 대여 가능
              </span>
              <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded ${stadiumData.uniformRent ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                유니폼 대여 가능
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
  );
}
