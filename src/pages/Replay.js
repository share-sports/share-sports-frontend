import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

// Mock data for demonstration
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

export default function Replay() {
  const navigate = useNavigate();
  const [selectedMatch, setSelectedMatch] = useState(matches[0]);
  const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const handleMatchChange = (matchId) => {
    const match = matches.find((m) => m.id.toString() === matchId);
    if (match) {
      setSelectedMatch(match);
      setCurrentGoalIndex(0);
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (event) => {
    setCurrentTime(parseFloat(event.target.value));
  };

  const handleNextGoal = () => {
    if (currentGoalIndex < selectedMatch.goals.length - 1) {
      setCurrentGoalIndex(currentGoalIndex + 1);
      setCurrentTime(0);
    }
  };

  const handlePreviousGoal = () => {
    if (currentGoalIndex > 0) {
      setCurrentGoalIndex(currentGoalIndex - 1);
      setCurrentTime(0);
    }
  };

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

      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Goal Replays</h1>
        <div className="border border-gray-300 rounded p-4 bg-white shadow mb-6">
          <div className="pb-2 mb-2 border-b">
            <h2 className="text-xl font-semibold">{selectedMatch.title}</h2>
            <p className="text-sm text-muted-foreground">Goal replays from {selectedMatch.date}</p>
          </div>
          <div className="aspect-video bg-gray-800 mb-4 flex items-center justify-center">
            <p className="text-white">Goal Replay Video Player</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button onClick={handlePreviousGoal} disabled={currentGoalIndex === 0} className="p-2 border rounded">
                <SkipBack className="h-4 w-4" />
              </button>
              <button onClick={togglePlayPause} className="p-2 border rounded">
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button onClick={handleNextGoal} disabled={currentGoalIndex === selectedMatch.goals.length - 1} className="p-2 border rounded">
                <SkipForward className="h-4 w-4" />
              </button>
            </div>
            <input
              type="range"
              value={currentTime}
              onChange={handleSeek}
              max="10"
              step="0.1"
              className="w-full"
            />
            <div className="text-sm text-muted-foreground text-center">
              {currentTime.toFixed(1)} / 10.0 seconds
            </div>
            <div className="text-center font-semibold">
              Goal {currentGoalIndex + 1} of {selectedMatch.goals.length}
            </div>
            <div className="text-center">
              {selectedMatch.goals[currentGoalIndex].player} ({selectedMatch.goals[currentGoalIndex].team}) - {selectedMatch.goals[currentGoalIndex].time}
            </div>
          </div>
        </div>
        <div className="border border-gray-300 rounded p-4 bg-white shadow">
          <div className="pb-2 mb-2 border-b">
            <h2 className="text-xl font-semibold">Select Match</h2>
            <p className="text-sm text-muted-foreground">Choose a match to watch goal replays</p>
          </div>
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
      </main>

      <footer className="bg-muted py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; 2023 풋살 매치. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
