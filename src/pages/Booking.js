import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

export default function Booking() {
  const location = useLocation();
  const [date, setDate] = useState(new Date());
  const [timeRange, setTimeRange] = useState({ start: 9, end: 11 });
  const [reservations, setReservations] = useState([]);
  const [businessHours, setBusinessHours] = useState({ start: 9, end: 21 });
  const [inviteLink, setInviteLink] = useState("");

  const stadiumUuid = new URLSearchParams(location.search).get("stadiumUuid");
  const openingHours = new URLSearchParams(location.search).get("openingHours");
  const closingHours = new URLSearchParams(location.search).get("closingHours");

  useEffect(() => {
    setDate(new Date());
  }, []);

  useEffect(() => {
    if (openingHours && closingHours) {
      const start = parseInt(openingHours.split(":")[0]);
      const end = parseInt(closingHours.split(":")[0]);
      setBusinessHours({ start, end });
      setTimeRange({ start, end: start + 2 });
    }
  }, [openingHours, closingHours]);

  useEffect(() => {
    if (stadiumUuid && date) {
      fetchReservations();
    }
  }, [stadiumUuid, date]);

  const fetchReservations = async () => {
    const formattedDate = date.toLocaleDateString("en-CA"); // yyyy-MM-dd 형식으로 변환
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `http://chaeseungji.iptime.org:25565/api/reservation/stadium?stadiumUuid=${stadiumUuid}&date=${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      if (data.isSuccess) {
        setReservations(data.result);
      } else {
        console.error("Failed to fetch reservations:", data.message);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const handleBooking = async () => {
    const startTime = new Date(date);
    startTime.setHours(timeRange.start, 0, 0, 0);
    const endTime = new Date(date);
    endTime.setHours(timeRange.end, 0, 0, 0);

    const formatDate = date => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day}:${hours}:${minutes}`;
    };

    const requestBody = {
      stadiumUuid,
      startTime: formatDate(startTime),
      endTime: formatDate(endTime),
    };

    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        "http://chaeseungji.iptime.org:25565/api/reservation/reserve",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("예약 실패");
      }

      const data = await response.json();
      alert("예약이 성공적으로 완료되었습니다!");
      generateInviteLink(data.result.reservationId); // 예약 후 초대 링크 생성
      fetchReservations();
    } catch (error) {
      alert("예약에 실패했습니다.");
      console.error("Error during booking:", error);
    }
  };

  const generateInviteLink = (reservationId) => {
    const link = `${window.location.origin}/join?reservationId=${reservationId}`;
    setInviteLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      alert("초대 링크가 복사되었습니다!");
    });
  };

  const HOUR_WIDTH = 100 / (businessHours.end - businessHours.start);

  const handleRangeChange = e => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - bounds.left, bounds.width));
    const percent = (x / bounds.width) * 100;
    const hour = Math.min(
      Math.max(
        Math.round(
          (percent / 100) * (businessHours.end - businessHours.start)
        ) + businessHours.start,
        businessHours.start
      ),
      businessHours.end
    );

    const isReserved = reservations.some(reservation => {
      const startHour = new Date(reservation.startTime).getHours();
      const endHour = new Date(reservation.endTime).getHours();
      return hour >= startHour && hour < endHour;
    });

    if (isReserved) return;

    const distToStart = Math.abs(hour - timeRange.start);
    const distToEnd = Math.abs(hour - timeRange.end);

    if (distToStart < distToEnd) {
      setTimeRange(prev => ({
        ...prev,
        start: Math.min(hour, prev.end - 1),
      }));
    } else {
      setTimeRange(prev => ({
        ...prev,
        end: Math.max(hour, prev.start + 1),
      }));
    }
  };

  const formatTime = dateString => {
    const date = new Date(dateString);
    return `${date.getHours().toString().padStart(2, "0")}:00`;
  };

  return (
    <div className="min-h-screen flex flex-col p-4 bg-gray-100">
      <Header />
      <h1 className="text-3xl font-semibold mb-6 text-center">예약 페이지</h1>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl mx-auto flex-grow">
        <p className="mb-4">Stadium UUID: {stadiumUuid}</p>
        <div className="mb-6">
          <label className="text-xl font-semibold mb-2 block">날짜 선택</label>
          <input
            type="date"
            value={date.toLocaleDateString("en-CA")}
            onChange={e => setDate(new Date(e.target.value))}
            className="w-full border rounded-md p-2 text-lg"
          />
        </div>

        <div className="flex flex-col mb-6">
          <label className="text-xl font-semibold mb-2">시간 선택</label>
          <div
            className="relative h-40 bg-gray-200 rounded-lg cursor-pointer"
            onClick={handleRangeChange}
          >
            <div
              className="absolute h-full bg-blue-300 rounded-lg"
              style={{
                left: `${(timeRange.start - businessHours.start) * HOUR_WIDTH}%`,
                width: `${(timeRange.end - timeRange.start) * HOUR_WIDTH}%`,
              }}
            />
            {Array.from({
              length: businessHours.end - businessHours.start + 1,
            }).map((_, i) => (
              <div
                key={i}
                className="absolute h-full flex flex-col items-center justify-end pb-2"
                style={{ left: `${i * HOUR_WIDTH}%` }}
              >
                <div className="h-full w-px bg-gray-400" />
                <span className="text-sm mt-2">{`${i + businessHours.start}:00`}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xl font-semibold">선택된 시간:</p>
          <p className="text-lg">{`${timeRange.start}:00 - ${timeRange.end}:00 (${timeRange.end - timeRange.start}시간)`}</p>
        </div>

        <button
          className="w-full bg-blue-500 text-white py-4 px-6 rounded-lg text-xl font-semibold hover:bg-blue-600 transition-colors mb-8"
          onClick={handleBooking}
        >
          예약하기
        </button>

        {inviteLink && (
          <div className="mt-8 p-4 bg-green-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">초대 링크</h2>
            <p className="mb-2">{inviteLink}</p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={copyToClipboard}
            >
              링크 복사
            </button>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">예약현황</h2>
          <div className="space-y-4">
            {reservations.length === 0 ? (
              <p className="text-gray-500">현재 예약된 내역이 없습니다.</p>
            ) : (
              reservations.map(reservation => (
                <div
                  key={reservation.memberName}
                  className="border rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">
                        {formatTime(reservation.startTime)} - {formatTime(reservation.endTime)}
                      </p>
                      <p className="text-gray-600">예약자: {reservation.memberName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600">{reservation.stadiumName}</p>
                      <p className="text-sm text-gray-500">{reservation.stadiumAddress}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
