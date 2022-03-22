import React from 'react';
import data from './data';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='App-main'>
        <div className='album-img'>
          <img 
            className='img-album'
            src={data.album.images[1].url}
            alt="queen"
          />
        </div>
        <div className='album-detail'>
          <h1 className='album-title text-white'>{data.name}</h1>
          <div className='artist-info'>
            <p className='text-white'>Artist : <span className='artist-name'>{data.album.artists[0].name}</span></p>
            <p className='text-white'>Release Date : <span className='release-date'>{data.album.release_date}</span></p>
            <p className='text-white'>Total Track : <span className='total-tracks'>{data.album.total_tracks}</span></p>
          </div>
          <button className='btn text-white'>Select</button>

        </div>
      </div>
    </div>
  );
}

    
export default App;
