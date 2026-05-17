import { Link } from 'react-router-dom';

function Navigationbar() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('Logged out successfully');
    };

    return (
        <nav>
            <Link to="/">Game</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
}

export default Navigationbar;