import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';
import { Alert, Nav, Navbar } from 'react-bootstrap';
import { Error } from './utils/interfaces';
import axiosInstance from './utils/fetcher';
import { LandPage, Home, RegistrationForm, VerificationCodePage } from './view';

const App: React.FC = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
    if (error?.status === 403) {
      localStorage.removeItem('token');
      setToken(null);
    }
  }, [error]);

  const handleSignout = async () => {
    try {
      setToken(null);
      await axiosInstance.post('/auth/signout');
      localStorage.removeItem('token');
    } catch (error: any) {
      console.log(error?.message || error);
    }
  };

  return (
    <Router>
      {error && (
        <Alert
          className="position-fixed top-0 end-0 m-3 z-1"
          variant="danger"
          onClose={() => {
            setError(null);
          }}
          dismissible
        >
          {error.message}
        </Alert>
      )}
      <Navbar bg="dark" data-bs-theme="dark">
        <Navbar.Brand className="ms-3">Message Office</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!token ? (
              <Link to="/" className="nav-link">
                Login
              </Link>
            ) : null}
            {!token ? (
              <Link to="/register" className="nav-link">
                Register
              </Link>
            ) : null}
          </Nav>
          <Nav>
            {token ? (
              <Nav.Link onClick={() => handleSignout()}>Logout</Nav.Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/home" />
            ) : (
              <LandPage setToken={setToken} setError={setError} />
            )
          }
        />
        <Route
          path="/register"
          element={
            !token ? (
              <RegistrationForm setError={setError} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/verify-code"
          element={
            !token ? (
              <VerificationCodePage setError={setError} setToken={setToken} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/home"
          element={token ? <Home setError={setError} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
