import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user , logout }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <a className="navbar-brand" href="#">
          Ecommerce
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="products">
                Products
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="cart">
                    Cart
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" onClick={logout}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <p className="nav-link" to="register">
                    Rigester
                  </p>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
