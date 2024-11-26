import React from 'react';
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

export default function Stats() {
  return (
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
        <p className="text-sm text-muted-foreground mb-4">최근 6개월 간의 득점 현황</p>
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
        <p className="text-sm text-muted-foreground mb-4">경기 결과 분포</p>
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

      <div className="border border-gray-300 rounded p-4 bg-white shadow">
        <h2 className="text-xl font-semibold">MVP 횟수</h2>
        <p className="text-sm text-muted-foreground mb-4">최근 6개월 간의 MVP 횟수</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mvpData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="mvps" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
