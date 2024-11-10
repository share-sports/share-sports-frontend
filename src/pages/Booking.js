"use client";

import { useEffect, useState } from "react";

export default function Component() {
  const [date, setDate] = useState(new Date());
  const [timeRange, setTimeRange] = useState({ start: 9, end: 11 });
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 영업시간 설정
  const BUSINESS_START = 9;
  const BUSINESS_END = 21;
  const HOUR_WIDTH = 100 / (BUSINESS_END - BUSINESS_START);

  useEffect(() => {
    const fetchReservations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const formattedDate = date.toISOString().split("T")[0];
        const response = await fetch(
          `http://localhost:25565/api/reservation/stadium?stadiumUuid=684651d2&date=${formattedDate}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch reservations");
        }

        const data = await response.json();
        if (data.isSuccess) {
          setReservations(data.result);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, [date]);

  const handleRangeChange = e => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - bounds.left, bounds.width));
    const percent = (x / bounds.width) * 100;
    const hour = Math.min(
      Math.max(
        Math.round((percent / 100) * (BUSINESS_END - BUSINESS_START)) +
          BUSINESS_START,
        BUSINESS_START
      ),
      BUSINESS_END
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
      setTimeRange(prev => ({ ...prev, start: Math.min(hour, prev.end - 1) }));
    } else {
      setTimeRange(prev => ({ ...prev, end: Math.max(hour, prev.start + 1) }));
    }
  };

  const renderReservedSlots = () => {
    return reservations.map((reservation, index) => {
      const startHour = new Date(reservation.startTime).getHours();
      const endHour = new Date(reservation.endTime).getHours();
      return (
        <div
          key={index}
          className="absolute h-full bg-red-200 opacity-50"
          style={{
            left: `${(startHour - BUSINESS_START) * HOUR_WIDTH}%`,
            width: `${(endHour - startHour) * HOUR_WIDTH}%`,
          }}
        />
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col p-4">
      <div className="bg-white rounded-lg shadow-md flex-grow flex flex-col">
        <div className="p-6 flex flex-col h-full">
          <div className="flex-grow flex flex-col gap-8">
            <div>
              <label className="text-2xl font-semibold mb-4 block">
                날짜 선택
              </label>
              <input
                type="date"
                value={date.toISOString().split("T")[0]}
                onChange={e => setDate(new Date(e.target.value))}
                className="w-full max-w-sm border rounded-md p-2"
              />
            </div>

            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="text-red-500 text-center">{error}</div>
            ) : (
              <div className="flex flex-col">
                <label className="text-2xl font-semibold mb-4 block">
                  시간 선택
                </label>
                <div className="flex-grow flex flex-col">
                  <div className="relative h-32">
                    <div
                      className="h-full bg-gray-100 rounded-lg relative cursor-pointer"
                      onClick={handleRangeChange}
                      role="slider"
                      aria-valuemin={BUSINESS_START}
                      aria-valuemax={BUSINESS_END}
                      aria-valuenow={timeRange.start}
                      aria-valuetext={`${timeRange.start}:00 to ${timeRange.end}:00`}
                    >
                      {renderReservedSlots()}
                      <div
                        className="absolute h-full bg-blue-200 rounded-lg transition-all"
                        style={{
                          left: `${
                            (timeRange.start - BUSINESS_START) * HOUR_WIDTH
                          }%`,
                          width: `${
                            (timeRange.end - timeRange.start) * HOUR_WIDTH
                          }%`,
                        }}
                      />
                      {Array.from({
                        length: BUSINESS_END - BUSINESS_START + 1,
                      }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute h-full flex flex-col items-center justify-end pb-2"
                          style={{ left: `${i * HOUR_WIDTH}%` }}
                        >
                          <div className="h-full w-px bg-gray-300" />
                          <span className="text-sm mt-2">{`${
                            i + BUSINESS_START
                          }:00`}</span>
                        </div>
                      ))}
                      <div
                        className="absolute top-0 h-full w-2 bg-blue-500 rounded cursor-ew-resize"
                        style={{
                          left: `${
                            (timeRange.start - BUSINESS_START) * HOUR_WIDTH
                          }%`,
                        }}
                      />
                      <div
                        className="absolute top-0 h-full w-2 bg-blue-500 rounded cursor-ew-resize"
                        style={{
                          left: `${
                            (timeRange.end - BUSINESS_START) * HOUR_WIDTH
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">선택된 시간:</span>
                    </div>
                    <span className="font-medium text-black text-lg">
                      {timeRange.start}:00 - {timeRange.end}:00 (
                      {timeRange.end - timeRange.start}
                      시간)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            className="w-full mt-8 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => {
              console.log("Booking time:", { date, timeRange });
            }}
          >
            예약하기
          </button>
        </div>
      </div>
    </div>
  );
}
