import React, { useEffect, useState } from "react";
import CardAlbum from "../../components/App-album/CardAlbum";
import Search from "../../components/form-search/Search";
import Playlist from "../playlist/Playlist";

export default function HomeUpdate({token, onSubmit, onChange, value, tracks }) {
  const [selected, setSelected] = useState([]);
  const [combine, setCombine] = useState([]);

  //   handle click
  const handleClick = (e) => {
    const index = selected.find((item) => item.id === e.id); //mencari index dari data yang sama
    if (index) {
      setSelected(selected.filter((item) => item.id !== e.id)); //filter data yang sama
      // console.log("ini di if");
    } else {
      setSelected([...selected, e]); //menambahkan data yang baru
      // console.log("ini di else");
    }
  };

  useEffect(() => {
    const combine = tracks.map((item) => ({
      ...item, //menggabungkan/mengcopy data yang sama
      isSelected: selected.find((t) => t.id === item.id),
    }));
    setCombine(combine);
  }, [selected, tracks]);

  // fungsi untuk menampilkan hasil search lagu dengan cara mapping dan filter(agar hilang setelah klik select)
  const itemList = () => {
    return combine.map((track, index) => (
      <React.Fragment key={index}>
        <CardAlbum
          onClick={() => handleClick(track)} // () => perlu di klik terlebih dahulu baru running
          image={track.album.images[0].url}
          title={track.name}
          artist={track.artists[0].name}
        >
          {track.isSelected ? "Deselect" : "Select"}
        </CardAlbum>
      </React.Fragment>
    ));
  };
  
  // menambahkan track ke playlist
  const addTrack = async (e) => {
    e.preventDefault();
    const selectedTrack = selected.map((item) => item.uri);
    await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        uris: selectedTrack,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTrackPlaylist(data.items);
        console.log(data);
      });
    setSelected([]);
  };

  return (
    <>
        <Playlist token={token}/>
        {selected.length === 0 ? null : (
        <button onClick={addTrack}>Save to Playlist</button>
      )}

      <h3 className="text-white">Search a Song</h3>
      <Search onSubmit={onSubmit} onChange={onChange} value={value} />

      <h3 className="title-left text-white">Selected</h3>
      <div className="grid">
        {selected.map((track) => (
          <React.Fragment key={track.id}>
            <CardAlbum
              onClick={() => handleClick(track)} // () => perlu di klik terlebih dahulu baru running
              image={track.album.images[0].url}
              title={track.name}
              artist={track.artists[0].name}
            >
              Deselect
            </CardAlbum>
          </React.Fragment>
        ))}
      </div>
      

      <h3 className="title-left text-white">Track List</h3>
      <div className="grid">{itemList()}</div>
    </>
  );
}
