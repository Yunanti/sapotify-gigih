import React from "react";

const CardAlbum = ({ image, title, artist, onClick, children, nama }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td className="App-album">
              <div className="album-img">
                <img className="img-album" src={image} alt={title} />
              </div>
              <div className="album-detail">
                <div>
                <h1 className="album-title">{title}</h1>
                <p>{artist}</p>
                <p>{nama}</p>
                </div>
                
                <div className="album-button">
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
