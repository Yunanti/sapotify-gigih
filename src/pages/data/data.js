import React from "react";
// import data1 from './data/data1';
import "./App.css";
import data2 from "./data/data2";


function Data() {
  const unique = Array.from(
    data2.reduce((map, obj) => map.set(obj.album.id, obj), new Map()).values()
  );

  console.log(unique);

  const fileList = data2.filter(function(event) {
    return data2.album.release_date.indexOf(event.type) > -1
  })

  console.log(fileList)
  return (
    

        
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
      </div> 
        
  );
}

export default Data;
