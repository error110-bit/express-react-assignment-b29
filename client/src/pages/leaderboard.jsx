import { useEffect, useState } from 'react';
import api from '../services/api';

function Leaderboard() {
    const [users, setUsers] = useState([]);

    const fetchLeaderboard = async () => {
        try {
            const response = await api.get('/puzzle/leaderboard');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
            alert('Failed to fetch leaderboard');
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    return (
        <div>
            <h1>Leaderboard Page</h1>
            <ol>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.username} - Score: {user.score}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default Leaderboard;