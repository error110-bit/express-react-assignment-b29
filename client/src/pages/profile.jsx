import { useEffect, useState } from 'react';
import api from '../services/api';

function Profile() {
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <p>Score: {profile.score}</p>

      <h3>Solved Puzzles</h3>

       <ul>
        {profile.solvedPuzzles.map((puzzle) => (
          <li key={puzzle.id}>{puzzle.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;