import React, { useState, useEffect } from "react";
import Album from "../../components/App-album/Album";

export default function AuthHooks() {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function redirectToSapotify() {
    const client_id = "1978717e3d6541e791a061c40ba1124c";

    const scopes = "playlist-modify-private";

    const redirect_uri = "http://localhost:3000/";

    const loginUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=token&show_dialog=true`;
    window.location = loginUrl;
    // return loginUrl;
  }

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    console.log(token);
    setToken(token);
  }, [token]);

  const handleInput = (e) => {
    setSearchKey(e.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("data") === null) {
      localStorage.setItem("data", JSON.stringify({}));
    }
  }, []);

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

  function logout() {
    setToken("");
    window.localStorage.removeItem("token");
  }

  const itemList = () => {
    return searchResults
      .filter((item) => !(item.id in selected))
      .map((track, index) => (
        <React.Fragment key={index}>
          <Album track={track} />
        </React.Fragment>
      ));
  };

  let selected = JSON.parse(localStorage.getItem("data"));

  return (
    <>
      {token ? (
        <button className="btn login" onClick={logout}>
          Logout
        </button>
      ) : (
        <button className="btn login" onClick={redirectToSapotify}>
          Login
        </button>
      )}

      {token && (
        <>
          <form className="form-search" onSubmit={searchTrack}>
            <input
              onChange={handleInput}
              type="text"
              name="search"
              placeholder="Search for a song"
              value={searchKey}
              className="form-input"
            />
            <input type="submit" value="Search" className="form-submit" />
          </form>
          <h3 className="title title-left text-white">My Playlist</h3>
          <div className="grid">
            {selected &&
              Object.values(selected).map((track, index) => (
                <React.Fragment key={index}>
                  <Album track={track} />
                </React.Fragment>
              ))}
          </div>

          <h3 className="title title-left text-white">Track List</h3>
          <div className="grid">{itemList()}</div>
        </>
      )}
    </>
  );
}
