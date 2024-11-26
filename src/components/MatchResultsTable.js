import React from "react";

export default function MatchResultsTable() {
    // Sample data - replace with your actual data
    const matches = [
        {
            date: "2024-01-15",
            time: "18:30",
            score: "3 vs 2",
            teams: "Team A vs Team B",
            result: "승", // 또는 "패" 또는 "무"
            replay: true,
            venue: "서울 풋살장 A구장",
        },
        {
            date: "2024-01-14",
            time: "19:00",
            score: "5 vs 5",
            teams: "Team C vs Team D",
            result: "무",
            replay: true,
            venue: "서울 풋살장 B구장",
        },
        // Add more matches as needed
    ];

    return (
        <div style={{ width: "100%", padding: "20px" }}>
            <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>경기일정·결과</h2>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button style={{ padding: "5px 10px", border: "1px solid #ccc", borderRadius: "5px" }}>◀</button>
                    <select style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "5px" }}>
                        <option>2024</option>
                        <option>2023</option>
                    </select>
                    <select style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "5px" }}>
                        <option>1월</option>
                        <option>2월</option>
                        {/* Add more months */}
                    </select>
                    <button style={{ padding: "5px 10px", border: "1px solid #ccc", borderRadius: "5px" }}>▶</button>
                </div>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f5f5f5", textAlign: "left" }}>
                        <th style={{ padding: "10px", border: "1px solid #ccc" }}>날짜</th>
                        <th style={{ padding: "10px", border: "1px solid #ccc" }}>시간</th>
                        <th style={{ padding: "10px", border: "1px solid #ccc" }}>경기</th>
                        <th style={{ padding: "10px", border: "1px solid #ccc" }}>결과</th>
                        <th style={{ padding: "10px", border: "1px solid #ccc" }}>리플레이</th>
                        <th style={{ padding: "10px", border: "1px solid #ccc" }}>구장위치</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map((match, index) => (
                        <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
                            <td style={{ padding: "10px", border: "1px solid #ccc" }}>{match.date}</td>
                            <td style={{ padding: "10px", border: "1px solid #ccc" }}>{match.time}</td>
                            <td style={{ padding: "10px", border: "1px solid #ccc", fontWeight: "bold" }}>{match.score}</td>
                            <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                                <span
                                    style={{
                                        fontWeight: "bold",
                                        color:
                                            match.result === "승"
                                                ? "blue"
                                                : match.result === "패"
                                                    ? "red"
                                                    : "gray",
                                    }}
                                >
                                    {match.result}
                                </span>
                            </td>
                            <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                                {match.replay && (
                                    <button
                                        style={{
                                            padding: "5px 10px",
                                            border: "1px solid #ccc",
                                            borderRadius: "5px",
                                            backgroundColor: "#fff",
                                            cursor: "pointer",
                                        }}
                                    >
                                        리플레이
                                    </button>
                                )}
                            </td>
                            <td style={{ padding: "10px", border: "1px solid #ccc" }}>{match.venue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
