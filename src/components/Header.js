import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useHistory } from "react-router-dom";

const Header = ({ children }) => {
  const history = useHistory();
  const { pathname } = history.location;
  return (
    <div className="container-header">
      <div className="container-nav">
        <div className="container-link">
          <nav className="navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
            <div className="collapse navbar-collapse">
              <div className="nav-title">
                <h5>Weather forecast</h5>
              </div>
              <div className="box2">
                <NavLink
                  exact
                  activeClassName="active"
                  to="/"
                  className={
                    pathname === "/" ? "navbar-brand active" : "navbar-brand"
                  }
                >
                  Home
                </NavLink>
              </div>
              <div className="box">
                <NavLink
                  exact
                  activeClassName="active"
                  to="/favorite"
                  className={
                    pathname === "/favorite"
                      ? "navbar-brand active"
                      : "navbar-brand"
                  }
                >
                  Favorites
                </NavLink>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="containerCard-deck">{children}</div>
    </div>
  );
};

export default Header;
