'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

// Mock data for demonstration
const goalData = [
  { month: 'Jan', goals: 3 },
  { month: 'Feb', goals: 5 },
  { month: 'Mar', goals: 2 },
  { month: 'Apr', goals: 7 },
  { month: 'May', goals: 4 },
  { month: 'Jun', goals: 6 },
];

const winRateData = [
  { name: 'Wins', value: 15 },
  { name: 'Losses', value: 5 },
  { name: 'Draws', value: 3 },
];

const mvpData = [
  { month: 'Jan', mvps: 1 },
  { month: 'Feb', mvps: 0 },
  { month: 'Mar', mvps: 2 },
  { month: 'Apr', mvps: 1 },
  { month: 'May', mvps: 0 },
  { month: 'Jun', mvps: 1 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const matches = [
  {
    id: 1,
    title: 'Finals: Team A vs Team B',
    date: '2024-05-15',
    goals: [
      { time: '23:15', player: 'John Doe', team: 'Team A' },
      { time: '45:30', player: 'Jane Smith', team: 'Team B' },
      { time: '78:45', player: 'Mike Johnson', team: 'Team A' },
    ],
  },
  {
    id: 2,
    title: 'Semifinals: Team C vs Team D',
    date: '2024-05-08',
    goals: [
      { time: '12:20', player: 'Sarah Brown', team: 'Team C' },
      { time: '67:10', player: 'Tom Wilson', team: 'Team D' },
    ],
  },
  {
    id: 3,
    title: 'Quarterfinals: Team E vs Team F',
    date: '2024-05-01',
    goals: [
      { time: '34:55', player: 'Chris Lee', team: 'Team E' },
      { time: '56:30', player: 'Emma Davis', team: 'Team F' },
      { time: '89:15', player: 'Alex Turner', team: 'Team E' },
      { time: '92:00', player: 'Chris Lee', team: 'Team E' },
    ],
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMatch, setSelectedMatch] = useState(matches[0]);
  const [currentGoalIndex, setCurrentGoalIndex] = useState(0);

  const handleMatchChange = (matchId) => {
    const match = matches.find((m) => m.id.toString() === matchId);
    if (match) {
      setSelectedMatch(match);
      setCurrentGoalIndex(0);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Tabs with adjusted width */}
          <div className="w-full md:w-48 space-y-4 border-r border-gray-200 pr-4">
            <div className="flex flex-col h-full space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`p-2 text-left ${activeTab === 'dashboard' ? 'font-bold text-primary' : 'text-gray-600'}`}
              >
                대시보드
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`p-2 text-left ${activeTab === 'stats' ? 'font-bold text-primary' : 'text-gray-600'}`}
              >
                나의 스탯
              </button>
              <button
                onClick={() => setActiveTab('replay')}
                className={`p-2 text-left ${activeTab === 'replay' ? 'font-bold text-primary' : 'text-gray-600'}`}
              >
                리플레이
              </button>
            </div>
          </div>

          {/* Tabs Content */}
          <div className="flex-grow space-y-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">대시보드</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="border border-gray-300 rounded p-4 bg-white shadow">
                    <h2 className="text-lg font-semibold">최근 예약</h2>
                    <ul className="list-disc pl-5 mt-2">
                      <li>A 구장 - 2023-05-15 14:00</li>
                      <li>B 구장 - 2023-05-18 16:00</li>
                      <li>C 구장 - 2023-05-20 10:00</li>
                    </ul>
                  </div>
                  <div className="border border-gray-300 rounded p-4 bg-white shadow">
                    <h2 className="text-lg font-semibold">내 전적</h2>
                    <p>승: 10</p>
                    <p>패: 5</p>
                    <p>승률: 66.67%</p>
                  </div>
                  <div className="border border-gray-300 rounded p-4 bg-white shadow">
                    <h2 className="text-lg font-semibold">득점 현황</h2>
                    <p>총 득점: 25</p>
                    <p>경기당 평균 득점: 1.67</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div>
                <h1 className="text-3xl font-bold mb-6">나의 스탯</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="border border-gray-300 rounded p-4 bg-white shadow">
                    <h2 className="text-sm font-medium">총 득점</h2>
                    <div className="text-2xl font-bold">27</div>
                    <p className="text-xs text-muted-foreground">지난 시즌보다 +5</p>
                  </div>
                  <div className="border border-gray-300 rounded p-4 bg-white shadow">
                    <h2 className="text-sm font-medium">승률</h2>
                    <div className="text-2xl font-bold">65.2%</div>
                    <p className="text-xs text-muted-foreground">지난 시즌보다 +2.3%</p>
                  </div>
                  <div className="border border-gray-300 rounded p-4 bg-white shadow">
                    <h2 className="text-sm font-medium">MVP 횟수</h2>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">지난 시즌보다 +2</p>
                  </div>
                </div>

                <div className="border border-gray-300 rounded p-4 bg-white shadow mb-6">
                  <h2 className="text-xl font-semibold">득점 통계</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={goalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="goals" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="border border-gray-300 rounded p-4 bg-white shadow mb-6">
                  <h2 className="text-xl font-semibold">승률</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={winRateData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {winRateData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'replay' && (
              <div>
                <h1 className="text-3xl font-bold mb-6">리플레이</h1>
                <div className="border border-gray-300 rounded p-4 bg-white shadow mb-6">
                  <h2 className="text-xl font-semibold">{selectedMatch.title}</h2>
                  <p className="text-sm text-muted-foreground">Goal replays from {selectedMatch.date}</p>

                  <div className="aspect-video bg-gray-800 mb-4 flex items-center justify-center">
                    <iframe
                      src="https://drive.google.com/file/d/1Ol1Kt1gqyTOs4TX6eb8JHnaVqam88U1S/preview"
                      width="100%"
                      height="100%"
                      allow="autoplay"
                      title="Goal Replay Video"
                      className="rounded-lg"
                    ></iframe>
                  </div>

                  <div className="text-center">
                    {selectedMatch.goals[currentGoalIndex].player} ({selectedMatch.goals[currentGoalIndex].team}) -{' '}
                    {selectedMatch.goals[currentGoalIndex].time}
                  </div>
                </div>

                <div className="border border-gray-300 rounded p-4 bg-white shadow">
                  <h2 className="text-xl font-semibold">Select Match</h2>
                  <select
                    value={selectedMatch.id.toString()}
                    onChange={(e) => handleMatchChange(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    {matches.map((match) => (
                      <option key={match.id} value={match.id.toString()}>
                        {match.title} - {match.date} ({match.goals.length} goals)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
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
