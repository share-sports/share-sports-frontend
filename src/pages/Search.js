"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Header from "../components/Header";

export default function FieldBooking() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [fields, setFields] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStadiums();
  }, []);

  const fetchStadiums = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://chaeseungji.iptime.org:25565/api/stadium/list"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch stadiums");
      }
      const data = await response.json();
      if (data.isSuccess) {
        setFields(data.result);
      } else {
        throw new Error(data.message || "Failed to fetch stadiums");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = e => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const filteredFields = fields.filter(
    field =>
      field.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">구장 예약</h1>
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="구장 검색"
            className="w-full pl-10 p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={handleSearch}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            🔍
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-[600px] bg-muted flex items-center justify-center rounded-lg">
            <span className="text-muted-foreground">지도 컴포넌트</span>
          </div>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : (
              filteredFields.map(field => (
                <div
                  key={field.stadiumUuid}
                  className="relative border border-gray-300 rounded p-4 bg-white shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold">{field.name}</h2>
                    <button
                      className="text-blue-500 hover:underline flex items-center"
                      onClick={() =>
                        navigate(`/details?stadiumUuid=${field.stadiumUuid}`)
                      }
                    >
                      상세 보기
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="text-sm text-gray-600 mb-2">
                      <strong>주소:</strong> {field.address}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <strong>전화번호:</strong> {field.phone}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <strong>영업시간:</strong> {field.openingHours} -{" "}
                      {field.closingHours}
                    </div>
                    <div className="text-sm mb-2">
                      <strong>설명:</strong> {field.description}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {field.parking && (
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                          주차 가능
                        </span>
                      )}
                      {field.shoeRent && (
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                          신발 대여 가능
                        </span>
                      )}
                      {field.ballRent && (
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                          공 대여 가능
                        </span>
                      )}
                      {field.uniformRent && (
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                          유니폼 대여 가능
                        </span>
                      )}
                    </div>
                    <div className="text-sm mb-4">
                      <strong>대여 비용:</strong>{" "}
                      {field.rentCost.toLocaleString()}원
                    </div>
                    <button
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                      onClick={() =>
                        navigate(
                          `/booking?stadiumUuid=${field.stadiumUuid}&openingHours=${field.openingHours}&closingHours=${field.closingHours}`
                        )
                      }
                    >
                      예약하기
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          &copy; 2023 풋살 매치. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
