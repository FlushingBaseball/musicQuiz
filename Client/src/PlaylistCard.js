import React from 'react';


function PlaylistCard({ name, genre }) {
  return (
    <div className="playlist-card">
      <h1>{name}</h1>
      <h2>{genre}</h2>
    </div>
  );
}

export default PlaylistCard;