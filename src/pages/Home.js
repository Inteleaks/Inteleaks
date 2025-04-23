import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await getDocs(collection(db, 'posts'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="home">
      <h2>Welcome to OSINT Trac</h2>
      <p>This is your open source intelligence hub.</p>

      <h3>Recent Posts:</h3>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id} style={{ marginBottom: '1rem' }}>
              <strong>{post.title}</strong>
              <p>{post.description}</p>
              <small>Location: {post.latitude}, {post.longitude}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
