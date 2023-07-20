import React from 'react';
import { useNavigate } from 'react-router-dom';



function PlaylistCard({ name, genre }) {

  
    const navigate = useNavigate()

  
  return (
    <div onClick={() => navigate("/quiz")} className="playlist-card">
      <h1>{name}</h1>
      <h2>{genre}</h2>
    </div>
  );
}

export default PlaylistCard;