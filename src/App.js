import React from 'react';
import data from './data';
import './App.css';
import ImageAlbum from './components/imageAlbum';
import DetailAlbum from './components/detailAlbum';

function App() {
  return (
    <div className="App">
      <div className='App-main'>
        <ImageAlbum url= {data.album.images[1].url}/>
        <DetailAlbum 
          nameSong={data.name} 
          nameArtist={data.album.artists[0].name} 
          releaseDate={data.album.release_date}
          totalTrack={data.album.total_tracks}
          btnSelect={"Select"}
        />
      </div>
    </div>
  );
}

    
export default App;
