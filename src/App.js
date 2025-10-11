import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import{ BrowserRouter,Routes, Route, useNavigate, useLocation} from 'react-router';
import React, { useState } from 'react';
import Dashboard from './Components/Dashboard';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isLogin = localStorage.getItem('isLogin');
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={
              !isLogin ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Dashboard onLogout={handleLogout} />
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isLogin ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            } 
          />
          <Route 
            path="/" 
            element={
              isLogin ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
