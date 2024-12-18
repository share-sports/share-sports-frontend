// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";
import MyPage from "./pages/MyPage";
import Replay from "./pages/Replay";
import Per_stat from "./pages/Per_stat";
import Details from "./pages/Details";
import Guide from "./pages/Guide";
import Booking from "./pages/Booking";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/replay" element={<Replay />} />
        <Route path="/stat" element={<Per_stat />} />
        <Route path="/details" element={<Details />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
