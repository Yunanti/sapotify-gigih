import React from "react";

const CardAlbum = ({ image, title, artist, onClick, children }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <div className="App-album">
              <div className="album-img">
                <img className="img-album" src={image} alt={title} />
              </div>
              <div className="album-detail">
                <h1 className="album-title text-white">{title}</h1>
                <p className="text-white">
                  <span className="artist-name">{artist}</span>
                </p>
                <button className="btn text-white" onClick={onClick}>
                  {children}
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CardAlbum;
