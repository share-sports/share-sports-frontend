import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import MatchResultsTable from "../components/MatchResultsTable";
import Replay from "./Replay"; // Replay 컴포넌트 import
import Stats from "./Per_stat";
import Dashboard from "./Dashboard";

const matches = [
  {
    id: 1,
    title: "Finals: Team A vs Team B",
    date: "2024-05-15",
    goals: [
      { time: "23:15", player: "John Doe", team: "Team A" },
      { time: "45:30", player: "Jane Smith", team: "Team B" },
      { time: "78:45", player: "Mike Johnson", team: "Team A" },
    ],
  },
  {
    id: 2,
    title: "Semifinals: Team C vs Team D",
    date: "2024-05-08",
    goals: [
      { time: "12:20", player: "Sarah Brown", team: "Team C" },
      { time: "67:10", player: "Tom Wilson", team: "Team D" },
    ],
  },
  {
    id: 3,
    title: "Quarterfinals: Team E vs Team F",
    date: "2024-05-01",
    goals: [
      { time: "34:55", player: "Chris Lee", team: "Team E" },
      { time: "56:30", player: "Emma Davis", team: "Team F" },
      { time: "89:15", player: "Alex Turner", team: "Team E" },
      { time: "92:00", player: "Chris Lee", team: "Team E" },
    ],
  },
];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-48 space-y-4 border-r border-gray-200 pr-4">
            <div className="flex flex-col h-full space-y-2">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`p-2 text-left ${
                  activeTab === "dashboard" ? "font-bold text-primary" : "text-gray-600"
                }`}
              >
                대시보드
              </button>
              <button
                onClick={() => setActiveTab("stats")}
                className={`p-2 text-left ${
                  activeTab === "stats" ? "font-bold text-primary" : "text-gray-600"
                }`}
              >
                나의 스탯
              </button>
              <button
                onClick={() => setActiveTab("replay")}
                className={`p-2 text-left ${
                  activeTab === "replay" ? "font-bold text-primary" : "text-gray-600"
                }`}
              >
                리플레이
              </button>
              <button
                onClick={() => setActiveTab("results")}
                className={`p-2 text-left ${
                  activeTab === "results" ? "font-bold text-primary" : "text-gray-600"
                }`}
              >
                경기 결과
              </button>
            </div>
          </div>

          <div className="flex-grow space-y-6">
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "stats" && <Stats />}
            {activeTab === "replay" && <Replay matches={matches} />}
            {activeTab === "results" && <MatchResultsTable />}
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
