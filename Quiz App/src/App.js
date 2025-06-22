import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddPlayerForm from './components/AddPlayerForm';
import QuizEngine from './components/QuizEngine';
import Leaderboard from './components/Leaderboard';
import About from './pages/About';
import ScoreSummary from './components/ScoreSummary';
import './styles.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<AddPlayerForm />} />
        <Route path="/quiz/start" element={<QuizEngine />} />
        <Route path="/scores" element={<Leaderboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/summary" element={<ScoreSummary />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}
export default App;