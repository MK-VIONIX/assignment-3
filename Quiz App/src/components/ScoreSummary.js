import { useNavigate } from 'react-router-dom';

export default function ScoreSummary() {
  const navigate = useNavigate();
  const results = JSON.parse(localStorage.getItem('quizScores')).slice(-1)[0];
  const percentage = Math.round((results.score / results.total) * 100);

  const getMessage = () => {
    if (percentage >= 90) return "Quiz Master! 🏆";
    if (percentage >= 70) return "Great job! 👍";
    if (percentage >= 50) return "Good effort!";
    return "Keep practicing! 💪";
  };

  return (
    <div className="summary-container">
      <h2>Quiz Completed!</h2>
      <div className="score-card">
        <h3>{results.playerName}'s Results</h3>
        <p>Score: {results.score}/{results.total} ({percentage}%)</p>
        <p className="message">{getMessage()}</p>
      </div>
      <div className="action-buttons">
        <button onClick={() => navigate('/quiz')}>Play Again</button>
        <button onClick={() => navigate('/scores')}>View Leaderboard</button>
      </div>
    </div>
  );
}