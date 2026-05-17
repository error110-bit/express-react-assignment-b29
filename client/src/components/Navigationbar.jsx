import { Link, useNavigate } from 'react-router-dom';

function Navigationbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('Logged out successfully');
        navigate('/login');
    };

    return (
        <nav className="navigationbar">
            <div className="logo">Movie Puzzler</div>

            <div className="links">
                 <Link to="/">Game</Link>
                 <Link to="/profile">Profile</Link>
                 <Link to="/leaderboard">Leaderboard</Link>
                 <Link to="/login">Login</Link>
                 <Link to="/signup">Signup</Link>
                 <button onClick={handleLogout}>Logout</button>
             </div>
        </nav>
    );
}

export default Navigationbar;