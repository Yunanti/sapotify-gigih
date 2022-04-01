import React, { useEffect, useState } from "react";
// import AuthHooks from "../../pages/auth/AuthHooks";

const Album = ({ track }) => {
  const [btnSelect, setBtnSelect] = useState(false);

  const handleBtnSelect = () => {
    setBtnSelect(!btnSelect);
    let selected = JSON.parse(localStorage.getItem('data'));
    if (btnSelect === false) {
      selected[track.id] = track;
    } else {
      delete selected[track.id]
    }
    localStorage.setItem('data', JSON.stringify(selected))
  };

  console.log(track);

  useEffect(() => {
    let selected = JSON.parse(localStorage.getItem('data'));
    if (selected[track.id]) {
      setBtnSelect(true);
    } else {
      setBtnSelect(false);
    }
  }, [track])

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <div className="App-album">
              <div className="album-img">
                <img className="img-album" src={track.album.images[0].url} alt={track.name} />
              </div>
              <div className="album-detail">
                <h1 className="album-title text-white">{track.name}</h1>
                <div className="artist-info">
                  <p className="text-white">
                    <span className="artist-name">{track.artists[0].name}</span>
                  </p>
                  {/* <p className="text-white">
              Release Date : <span className="release-date">{releaseDate}</span>
            </p>
            <p className="text-white">
              Total Track : <span className="total-tracks">{totalTrack}</span>
            </p> */}
                </div>
                <button className="btn text-white" onClick={handleBtnSelect}>
                  {btnSelect ? "Deselect" : "Select"}
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Album;
