import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        شركة الميسرة
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/products">
              المنتوجات <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/customers">
              الزبائن
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/orders">
              المبيعات
            </NavLink>
          </li>
          {!user && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  دخول
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  حساب جديد
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  مرحباً {user.name}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  خروج
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
