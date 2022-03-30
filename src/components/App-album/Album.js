import React from "react";

const Album = ({
  url,
  nameSong,
  nameArtist,
  // releaseDate,
  // totalTrack,
  // btnSelect,
  alt,
}) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <div className="App-album">
              <div className="album-img">
                <img className="img-album" src={url} alt={alt} />
              </div>
              <div className="album-detail">
                <h1 className="album-title text-white">{nameSong}</h1>
                <div className="artist-info">
                  <p className="text-white">
                    <span className="artist-name">{nameArtist}</span>
                  </p>
                  {/* <p className="text-white">
              Release Date : <span className="release-date">{releaseDate}</span>
            </p>
            <p className="text-white">
              Total Track : <span className="total-tracks">{totalTrack}</span>
            </p> */}
                </div>
                <button className="btn text-white">Select</button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Album;
