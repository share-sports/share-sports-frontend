import React, { useState, useEffect } from "react";

const ShareSportsReplay = () => {
  const matches = [
    {
      id: 1,
      title: "Finals: Team A vs Team B",
      date: "2024-05-15",
      score: { teamA: 2, teamB: 2 },
      goals: [
        { time: "05:23", team: "Team A", minute: 5 },
        { time: "09:45", team: "Team B", minute: 9 },
        { time: "13:67", team: "Team A", minute: 13 },
        { time: "18:89", team: "Team B", minute: 18 },
      ],
    },
  ];

  const [selectedMatch, setSelectedMatch] = useState(matches[0]);
  const [videoRef, setVideoRef] = useState(null);

  const handleSeekVideo = (time) => {
    if (videoRef) {
      const [minutes, seconds] = time.split(":").map(Number);
      videoRef.currentTime = minutes * 60 + seconds;
      videoRef.play();
    }
  };

  const handleMatchChange = (e) => {
    const match = matches.find((m) => m.id === Number(e.target.value));
    if (match) {
      setSelectedMatch(match);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Share Sports</h1>
          <div className="flex gap-4">
            <button className="text-sm">로그인</button>
            <button className="text-sm">회원가입</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">리플레이</h2>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h3 className="text-xl font-semibold mb-2">{selectedMatch.title}</h3>
          <p className="text-sm text-gray-600 mb-4">
            Goal replays from {selectedMatch.date}
          </p>

          <div className="aspect-video bg-gray-900 mb-6 rounded-lg overflow-hidden">
            <video
              ref={(ref) => setVideoRef(ref)}
              className="w-full h-full"
              controls
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="text-center">
              <span className="text-2xl font-bold">
                {selectedMatch.score.teamA}
              </span>
              <p className="text-sm">Team A</p>
            </div>
            <div className="text-xl font-bold">:</div>
            <div className="text-center">
              <span className="text-2xl font-bold">
                {selectedMatch.score.teamB}
              </span>
              <p className="text-sm">Team B</p>
            </div>
          </div>

          <div className="relative max-w-2xl mx-auto">
            <div className="timeline-line absolute left-1/2 h-full w-[2px] bg-gray-300 transform -translate-x-1/2"></div>
            {selectedMatch.goals.map((goal, index) => (
              <div
                key={index}
                className="relative mb-8 timeline-item"
                onClick={() => handleSeekVideo(goal.time)}
              >
                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    {goal.team === "Team A" && (
                      <div className="font-semibold">⚽ {goal.team}</div>
                    )}
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-8 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center">
                      {goal.time}
                    </div>
                  </div>
                  <div className="w-1/2 pl-8">
                    {goal.team === "Team B" && (
                      <div className="font-semibold">{goal.team} ⚽</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-2">Select Match</h3>
          <p className="text-sm text-gray-600 mb-4">
            Choose a match to watch goal replays
          </p>
          <select
            className="w-full p-2 border rounded"
            onChange={handleMatchChange}
          >
            {matches.map((match) => (
              <option key={match.id} value={match.id}>
                {match.title} - {match.date} ({match.goals.length} goals)
              </option>
            ))}
          </select>
        </div>
      </main>

      <footer className="border-t mt-12 bg-white">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
          © 2023 풋살 매치. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ShareSportsReplay;
