import React from "react";

const Album = ({
  url,
  nameSong,
  nameArtist,
  releaseDate,
  totalTrack,
  btnSelect,
}) => {
  return (
    <td>
      <div className="App-album">
        <div className="album-img">
          <img className="img-album" src={url} alt="queen" />
        </div>
        <div className="album-detail">
          <h1 className="album-title text-white">{nameSong}</h1>
          <div className="artist-info">
            <p className="text-white">
              Artist : <span className="artist-name">{nameArtist}</span>
            </p>
            <p className="text-white">
              Release Date : <span className="release-date">{releaseDate}</span>
            </p>
            <p className="text-white">
              Total Track : <span className="total-tracks">{totalTrack}</span>
            </p>
          </div>
          <button className="btn text-white">{btnSelect}</button>
        </div>
      </div>
    </td>
  );
};

export default Album;
