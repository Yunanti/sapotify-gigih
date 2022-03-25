import React from "react";
// import data1 from './data/data1';
import "./App.css";
import Album from "./components/App-album/Album";
import data2 from "./data/data2";

function App() {
  const unique = Array.from(
    data2.reduce((map, obj) => map.set(obj.album.id, obj), new Map()).values()
  );

  console.log(unique);
  return (
    <div className="App">
      <table>
        <tbody>
          <tr>
            {unique.map(({ album, index }) => {
              return (
                <Album
                  url={album.images[1].url}
                  nameSong={album.name}
                  nameArtist={album.artists[0].name}
                  releaseDate={album.release_date}
                  totalTrack={album.total_tracks}
                  btnSelect={"Select"}
                  key={album.release_date}
                />
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
