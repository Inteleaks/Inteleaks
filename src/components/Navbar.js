// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/map" style={{ marginRight: '1rem' }}>Map</Link>

      {user ? (
        <>
          <Link to="/new" style={{ marginRight: '1rem' }}>New Post</Link>
          <button onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
