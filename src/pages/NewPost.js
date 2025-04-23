import React, { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      setError("You must be logged in to create a post.");
      return;
    }

    try {
      await addDoc(collection(db, 'posts'), {
        title,
        description,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        userId: auth.currentUser.uid,
        createdAt: Timestamp.now()
      });
      setSuccess("Post created!");
      setTitle('');
      setDescription('');
      setLatitude('');
      setLongitude('');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        /><br />
        <input
          type="number"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
        /><br />
        <input
          type="number"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
        /><br />
        <button type="submit">Post</button>
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default NewPost;
