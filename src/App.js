import React from "react";
// import data1 from './data/data1';
import "./App.css";
import Album from "./components/App-album/Album";
import data2 from "./data/data2";
import Auth from "./pages/auth/Auth";

function App() {
  // const unique = Array.from(
  //   data2.reduce((map, obj) => map.set(obj.album.id, obj), new Map()).values()
  // );

  // console.log(unique);

  // const fileList = data2.filter(function(event) {
  //   return data2.album.release_date.indexOf(event.type) > -1
  // })

  // console.log(fileList)
  return (
    <div className="App">
       <header>
        <h1 className="title text-white">Sapotify</h1>
        <h3 className="title title-left text-white">Track List</h3>
      </header>
      {/*
      <div  className="tbl">
      <table>
        <tbody className="grid">
        {data2.map(({ album }) => {
          return (
            <td>
              <Album
                url={album.images[1].url}
                nameSong={album.name}
                nameArtist={album.artists[0].name}
                releaseDate={album.release_date}
                totalTrack={album.total_tracks}
                btnSelect={"Select"}
                key={album.release_date}
              />
            </td>
          );
        })}
        </tbody>
      </table>
      </div> */}
      <div className="tbl"><Auth /></div>
    </div>
  );
}

export default App;
