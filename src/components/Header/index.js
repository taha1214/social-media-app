import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/userSlice";
import { useState } from "react";
import { Button } from "antd";
import "./index.css";
const Header = () => {
  const { user } = useSelector((s) => s.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/login");
  }
    return (
      <div className="main-header">
                  <div className="logo-container">
                <img alt="logo" src="Facebook-Logo-2019.png" className="logo" />
                <button 
                    className="mobile-menu-icon" 
                    onClick={() => setIsMobile(!isMobile)}
                >
                    {isMobile ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
                </button>
            </div>
        {user ? (
          <div className={`links-container ${isMobile ? "active" : ""}`}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : "nav-link")}
            >
              Home
            </NavLink>
            <NavLink
              to="/my-blogs"
              className={({ isActive }) => (isActive ? "active-link" : "nav-link")}
            >
              My posts
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "active-link" : "nav-link")}
            >
              Profile
            </NavLink>
            <NavLink
              to="/create-blog"
              className={({ isActive }) => (isActive ? "active-link" : "nav-link")}
            >
              Create post
            </NavLink>
            <Button onClick={handleLogOut}>Log out</Button>
          </div>
        ) : (
          <div className={`login-signup-button ${isMobile ? "active" : ""}`}>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/signup">
              <Button type="primary">Signup</Button>
            </Link>
          </div> 
        )
        }
      </div>
    );
  };


export default Header;
