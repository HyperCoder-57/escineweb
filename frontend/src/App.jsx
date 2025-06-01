import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MovieList from './components/MovieList';
import ReservationSummary from './components/ReservationSummary';
import SeatSelector from './components/SeatSelector';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reservation/:id" element={<ReservationSummary />} />
        <Route path="/seat/:id" element={<SeatSelector />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/movielist" element={<MovieList />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;