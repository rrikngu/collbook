import React, { useState } from 'react';
import './App.css';
import albums from './data/albums.json';
import photocards from './data/photocards.json';

export default function App() {
  // Set the default selected album ID
  const [selectedAlbumId, setSelectedAlbumId] = useState(albums[0]?.id || '');
  const [pulledCard, setPulledCard] = useState(null);

  // Retrieve current album details
  const currentAlbum = albums.find(a => a.id === selectedAlbumId);

  // Filter pool based on selected album
  const currentPool = photocards.filter(c => c.albumId === selectedAlbumId);

  // Dynamic card title: albumTitle + version + member + "Limited"
  const getFullCardName = (card) => {
    if (!currentAlbum) return card.member;
    const limitedSuffix = card.isLimited ? ' Limited' : '';
    return `${currentAlbum.albumTitle} ${currentAlbum.version} ${card.member}${limitedSuffix}`;
  };

  // Uniform random pull from the active pool
  const performPull = () => {
    if (!currentPool.length) return;
    const randomIndex = Math.floor(Math.random() * currentPool.length);
    setPulledCard(currentPool[randomIndex]);
  };

  return (
    <div className="app-viewport">
      <div className="mobile-shell">
        
        {/* Mobile Header / Status Bar Area */}
        <header className="mobile-header">
          <span className="brand-title">collbook</span>

          {/* Album Selector Dropdown WIP */}
          {albums.length > 1 && (
            <select 
              value={selectedAlbumId} 
              onChange={(e) => {
                setSelectedAlbumId(e.target.value);
                setPulledCard(null); // Reset current pull when changing albums
              }}
              style={{
                background: '#232733',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '4px 8px',
                borderRadius: '8px',
                fontSize: '0.8rem'
              }}
            >
              {albums.map(album => (
                <option key={album.id} value={album.id}>
                  {album.artist} - {album.version}
                </option>
              ))}
            </select>
          )}
        </header>

        {/* Main Content Area */}
        <main className="mobile-content">
          <div className="unboxing-stage">
            
            {!pulledCard ? (
              <div className="pack-card" onClick={performPull}>
                <img 
                      className="pack-image"
                      src={currentAlbum.coverImage} 
                      alt={currentAlbum.albumTitle}
                  />
                <div className="pack-meta">
                    <span className="pack-title">{currentAlbum.albumTitle} {currentAlbum.version}</span>
                    <span className="pack-artist">{currentAlbum.artist}</span>
                </div>
              </div>
            ) : (
              <div className="card-reveal reveal-wrapper">
                <div className="card-frame" style={{ position: 'relative' }}>
                  <div className="media-wrapper">
                    <img src={pulledCard.image} alt={pulledCard.member} className="card-media" />
                    {pulledCard.isLimited && (
                      <span className="card-badge">
                        LIMITED
                      </span>
                    )}
                  </div>  
                  <div className="card-meta">
                    <h3 style={{ fontSize: '0.95rem' }}>{getFullCardName(pulledCard)}</h3>
                  </div>
                </div>
                
                <button className="pull-btn" onClick={performPull}>
                  Open Again
                </button>
              </div>
            )}

          </div>
        </main>

      </div>
    </div>
  );
}