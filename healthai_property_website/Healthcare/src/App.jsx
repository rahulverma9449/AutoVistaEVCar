import { Routes, Route } from 'react-router-dom';
import MirrorHeader from './pages/MirrorHeader';
import Login from './pages/Login';
import Callback from './Auth/Callback';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Property from './pages/Property';
import Selling from './pages/Selling';
import { useAuth0 } from '@auth0/auth0-react';

function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <div className="loading">Loading…</div>;
  return isAuthenticated ? children : <Login />;
}

export default function App() {
  const { user } = useAuth0();
  console.log("Current user:", user);

  return (
    <div className="app-container">
      <MirrorHeader />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/dashboard" element={
            <PrivateRoute><Dashboard /></PrivateRoute>
          }/>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/property/:id" element={<Property />} />
          <Route path="/selling" element={
            <PrivateRoute><Selling /></PrivateRoute>
          }/>
        </Routes>
      </main>
      <footer className="app-footer">
        &copy; 2024 AutoVistaCar. All rights reserved.
      </footer>
    </div>
  );
}
