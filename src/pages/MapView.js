// src/pages/MapView.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

// Fix marker icon issue (optional, only if you keep markers)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!points.length) return;

    const heatLayer = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 10,
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [points, map]);

  return null;
};

const MapView = () => {
  const [heatPoints, setHeatPoints] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await getDocs(collection(db, 'posts'));
      const data = snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          title: d.title,
          description: d.description,
          latitude: d.latitude,
          longitude: d.longitude,
        };
      });

      setPosts(data);
      setHeatPoints(data.map(p => [p.latitude, p.longitude]));
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>OSINT Map</h2>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: '600px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <HeatmapLayer points={heatPoints} />
        {/* Optional: Keep markers alongside heat map */}
        {posts.map(post => (
          <Marker key={post.id} position={[post.latitude, post.longitude]}>
            <Popup>
              <strong>{post.title}</strong><br />
              {post.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
