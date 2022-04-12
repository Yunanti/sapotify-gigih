import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardAlbum from "../../components/App-album/CardAlbum";
import Search from "../../components/form-search/Search";
// import { tokenAuth } from "../../redux/action";
// import Playlist from "../playlist/Playlist";

export default function HomeRouter() {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selected, setSelected] = useState([]);
  const [combine, setCombine] = useState([]);

  const { token } = useSelector((state) => state.token);
  // const dispatch = useDispatch();

  // state untuk menampilkan akun
  const [user, setUser] = useState([]);

  // state untuk membuat playlist
  const [playlist, setPlaylist] = useState([]);

  // state untuk menambahkan track ke playlist
  const [trackPlaylist, setTrackPlaylist] = useState([]);

  // fungsi untuk mengsetting button
  const handleInput = (e) => {
    setSearchKey(e.target.value);
  };

  // Calls Spotify Search API
  const searchTrack = (e) => {
    e.preventDefault();

    fetch(
      `https://api.spotify.com/v1/search?type=track&include_external=audio&q=${searchKey}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => setSearchResults(result.tracks.items));
  };
  
  // console.log(searchResults);

  // menampilkan akun
  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  // console.log(token);
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => data);
      setUser(response);
    };
    getUser();
  }, [token]);

  // menginput playlist dari api
  const createPlaylist = (e) => {
    e.preventDefault();
    fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: input.title,
        description: input.description,
        public: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPlaylist(data);
        console.log(data);
      });
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
    const combine = searchResults.map((item) => ({
      ...item, //menggabungkan/mengcopy data yang sama
      isSelected: selected.find((t) => t.id === item.id),
    }));
    setCombine(combine);
  }, [selected, searchResults]);

  // fungsi untuk menampilkan hasil search lagu dengan cara mapping dan filter(agar hilang setelah klik select)
  const itemList = () => {
    return combine.map((track, index) => (
      <React.Fragment key={index}>
        <CardAlbum
          onClick={() => handleClick(track)} // () => perlu di klik terlebih dahulu baru running
          image={track.album.images[0].url}
          title={track.name}
          artist={track.artists[0].name}
          nama={track.album.name}
        >
          {track.isSelected ? "Deselect" : "Select"}
        </CardAlbum>
      </React.Fragment>
    ));
  };

  // fungsi untuk mengsetting playlist
  const handlePlaylist = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  

  return (
    <>
      <div className="form-title">
        {/* <h2 className="text-white">Create Playlist</h2> */}
        <h2 className="text-white">Hello {user.display_name}!</h2>
        <p className="text-white">ID: {user.id}</p>
        <p className="text-white">
          Want to create a playlist? Give your playlist a title and description.
        </p>
      </div>

      <div className="form-playlist">
        <form onSubmit={createPlaylist}>
          <div className="form-group">
            <label className="text-white">Title<br></br></label>
            <input
              type="text"
              name="title"
              placeholder="write a title"
              value={playlist.title}
              onChange={handlePlaylist}
              maxLength="10" //maksimal 10 karakter
            />
          </div>
          <div className="form-group">
            <label className="text-white">Description<br></br></label>
            <textarea
              type="text"
              name="description"
              placeholder="write a escription"
              value={playlist.description}
              onChange={handlePlaylist}
            />
          </div>
          <input type="submit" value="Create Playlist" className="btn" />
        </form>
      </div>

      <div className="form-tracks">
        <h3 className="title-left text-white">{playlist.name} Playlist</h3>
        <p className="text-white">{playlist.description}</p>
        <div className="grid">
          {trackPlaylist.map((item) => (
            <React.Fragment key={item.track.id}>
              {/* {console.log("ini item"+item)} */}
              <CardAlbum
                image={item.track.album.images[0].url}
                title={item.track.name}
                artist={item.track.artists[0].name}
                nama={item.track.album.name}
              >
                Play
              </CardAlbum>
            </React.Fragment>
          ))}
        </div>
      </div>

      <Search onSubmit={searchTrack} onChange={handleInput} value={searchKey} />

      <h3 className="title-left text-white">Selected</h3>
      <div className="grid">
        {selected.map((track) => (
          <React.Fragment key={track.id}>
            {/* {console.log(track.album.name)} */}
            <CardAlbum
              onClick={() => handleClick(track)} // () => perlu di klik terlebih dahulu baru running
              image={track.album.images[0].url}
              title={track.name}
              artist={track.artists[0].name}
              nama={track.album.name}
            >
              Deselect
            </CardAlbum>
          </React.Fragment>
        ))}
      </div>
      {selected.length === 0 ? null : (
        <button className="btn" onClick={addTrack}>Save to Playlist</button>
      )}

      <h3 className="title-left text-white">Track List</h3>
      <div className="grid">{itemList()}</div>
    </>
  );
}
