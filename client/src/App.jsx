import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Game from './pages/game.jsx';
import Login from './pages/login.jsx';  
import Signup from './pages/signup.jsx';
import Profile from './pages/profile.jsx';
import Leaderboard from './pages/leaderboard.jsx';
import Navigationbar from './components/Navigationbar.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navigationbar />
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

