'use client';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Header 컴포넌트 임포트
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

export default function PersonalStatsPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header /> {/* Header 컴포넌트 사용 */}

      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Personal Statistics</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="border border-gray-300 rounded p-4 bg-white shadow">
            <h2 className="text-sm font-medium">Total Goals</h2>
            <div className="text-2xl font-bold">27</div>
            <p className="text-xs text-muted-foreground">+5 from last season</p>
          </div>
          <div className="border border-gray-300 rounded p-4 bg-white shadow">
            <h2 className="text-sm font-medium">Win Rate</h2>
            <div className="text-2xl font-bold">65.2%</div>
            <p className="text-xs text-muted-foreground">+2.3% from last season</p>
          </div>
          <div className="border border-gray-300 rounded p-4 bg-white shadow">
            <h2 className="text-sm font-medium">MVP Awards</h2>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+2 from last season</p>
          </div>
        </div>

        <div className="border border-gray-300 rounded p-4 bg-white shadow mb-6">
          <h2 className="text-xl font-semibold">Goal Statistics</h2>
          <p className="text-sm text-muted-foreground mb-4">Your goal scoring performance over the past 6 months</p>
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
          <h2 className="text-xl font-semibold">Win Rate</h2>
          <p className="text-sm text-muted-foreground mb-4">Your match results distribution</p>
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
          <h2 className="text-xl font-semibold">MVP Awards</h2>
          <p className="text-sm text-muted-foreground mb-4">Your MVP award count over the past 6 months</p>
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
      </main>

      <footer className="bg-muted py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; 2023 풋살 매치. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
