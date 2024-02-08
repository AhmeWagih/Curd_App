import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logInOut } from "../state/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="header">
        <ul className="logo">
          <li>CRUD APP</li>
        </ul>
        <ul className="nav-ul">
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/post/add">Add Post</NavLink>
          </li>
        </ul>
        <ul className="login">
          <li
            className={isLoggedIn ? "active" : "notActive"}
            onClick={() => dispatch(logInOut())}
          >
            {isLoggedIn ? "LogOut" : "LoggIn"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
