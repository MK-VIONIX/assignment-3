import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="hero">
      <div className="hero-text">
        <h1>Welcome to the Quiz Challenge!</h1>
        <p>Test your knowledge across various categories</p>
        <Link to="/quiz" className="start-button">Start Quiz</Link>
      </div>
      <div className="hero-image">
        <div className="floating">📚</div>
      </div>
    </div>
  );
}
export default Home;