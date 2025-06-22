import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddPlayerForm() {
  const [formData, setFormData] = useState({
    playerName: '',
    category: '',
    difficulty: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('currentPlayer', JSON.stringify(formData));
    navigate('/quiz/start');
  };

  return (
    <div className="form-container">
      <h2>Enter Quiz Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="playerName"
          placeholder="Your Name"
          value={formData.playerName}
          onChange={handleChange}
          required
        />
        
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="general">General Knowledge</option>
          <option value="science">Science</option>
          <option value="history">History</option>
          <option value="sports">Sports</option>
        </select>
        
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          required
        >
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        
        <button 
          type="submit" 
          disabled={!formData.playerName || !formData.category || !formData.difficulty}
          className="submit-btn"
        >
          Start Quiz
        </button>
      </form>
    </div>
  );
}