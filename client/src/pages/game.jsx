import { useEffect, useState } from 'react';
import api from '../services/api';

function Game() {
  const [puzzle, setPuzzle] = useState(null);
  const [answer, setAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [hintAvailable, setHintAvailable] = useState(false);
  const [hint, setHint] = useState('');
  const [difficulty, setDifficulty] = useState('');
  
  const fetchPuzzle = async () => {
    try {
      const response = await api.get(difficulty ? `/puzzle/random?difficulty=${difficulty}` : '/puzzle/random');
      setPuzzle(response.data);
      setAnswer('');
      setAttempts(0);
      setHintAvailable(false);
      setHint('');  
    } catch (error) {
      console.error(error);
      alert('Failed to fetch puzzle');
    }
  };

  useEffect(() => {
    fetchPuzzle();
  }, []);

  const handleAnswerSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(
        '/puzzle/answer',
        { id: puzzle.id, answer },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.correct) {
        alert('Correct answer!');
        fetchPuzzle();
      } else {
        alert('Wrong answer, try again!');
        setAttempts(response.data.attempts);
        setHintAvailable(response.data.hintAvailable);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to submit answer');
    }
  };

  const fetchHint = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(`/puzzle/hint/${puzzle.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHint(response.data.hint);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch hint');
    }
  };

  if (!puzzle) return <div>Loading...</div>;

  return (
    <div>
      <h1>Movie Puzzler</h1>

      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="">All Difficulties</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button onClick={fetchPuzzle}>Get New Puzzle</button>

      <h3>{puzzle.description}</h3>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Your answer" 
       />        

        <button onClick={handleAnswerSubmit}>Submit Answer</button>  
        <p>Attempts: {attempts}</p>

        {hintAvailable && (
          <button onClick={fetchHint}>Get Hint</button>
        )}
        {hint && <p>Hint: {hint}</p>}

        <button onClick={fetchPuzzle}>Next Puzzle</button>
    </div>
  );
}

export default Game;