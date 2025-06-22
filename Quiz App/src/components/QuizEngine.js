import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import questions from '../data/questions';

export default function QuizEngine() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [quizData, setQuizData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const playerData = JSON.parse(localStorage.getItem('currentPlayer'));
    const categoryQuestions = questions[playerData.category] || [];
    setQuizData(categoryQuestions);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !selectedOption) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft, selectedOption]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setTimeLeft(15);
    } else {
      saveResults();
      navigate('/summary');
    }
  };

  const saveResults = () => {
    const results = {
      playerName: JSON.parse(localStorage.getItem('currentPlayer')).playerName,
      score,
      total: quizData.length,
      date: new Date().toISOString()
    };
    
    const allScores = JSON.parse(localStorage.getItem('quizScores')) || [];
    allScores.push(results);
    localStorage.setItem('quizScores', JSON.stringify(allScores));
  };

  if (!quizData.length) return <div>Loading questions...</div>;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <span>Question {currentQuestion + 1}/{quizData.length}</span>
        <span>Time: {timeLeft}s</span>
        <span>Score: {score}</span>
      </div>
      
      <h3>{quizData[currentQuestion].question}</h3>
      
      <div className="options">
        {quizData[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => !selectedOption && handleOptionSelect(option)}
            className={`
              ${selectedOption === option ? 'selected' : ''}
              ${selectedOption && option === quizData[currentQuestion].correctAnswer ? 'correct' : ''}
              ${selectedOption && option !== quizData[currentQuestion].correctAnswer && selectedOption === option ? 'incorrect' : ''}
            `}
            disabled={selectedOption}
          >
            {option}
          </button>
        ))}
      </div>
      
      {selectedOption && (
        <button className="next-btn" onClick={handleNextQuestion}>
          {currentQuestion < quizData.length - 1 ? 'Next Question' : 'See Results'}
        </button>
      )}
    </div>
  );
}