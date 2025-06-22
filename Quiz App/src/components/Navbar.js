import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Quiz App</Link>
        <button 
          className="hamburger" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>
      <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/quiz">Start Quiz</Link>
        <Link to="/scores">Scores</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}
export default Navbar;