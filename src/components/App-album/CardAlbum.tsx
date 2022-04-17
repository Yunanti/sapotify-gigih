import React, { ReactNode } from "react";

type Album = {
  image: string,
  title: string,
  artist: string,
  onClick: () => void,
  children: ReactNode,
  nama: string,
}

const CardAlbum = (Albums: Album) => {
  return (
    <table>
      <tbody>
        <tr>
          <td className="App-album">
              <div className="album-img">
                <img className="img-album" src={Albums.image} alt={Albums.title} />
              </div>
              <div className="album-detail">
                <div>
                <h1 className="album-title">{Albums.title}</h1>
                <p>{Albums.artist}</p>
                <p>{Albums.nama}</p>
                </div>
                
                <div className="album-button">
                <button className="btn text-white" onClick={Albums.onClick}>
                  {Albums.children}
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
