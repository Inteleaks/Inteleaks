import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import MapView from './pages/MapView';
import 'leaflet/dist/leaflet.css';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

// Inside <Routes>:
<Route
  path="/new"
  element={
    <PrivateRoute>
      <NewPost />
    </PrivateRoute>
  }
/>

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new" element={<NewPost />} />\
        <Route path="/map" element={<MapView />} />
      </Routes>
    </Router>
  );
}

export default App;
