import React, { useState, useEffect } from "react";
import Home from "../home/Home";

// ini pakai state

export default function Auth() {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // fungsi untuk login spotify
  function redirectToSapotify() {
    const client_id = "1978717e3d6541e791a061c40ba1124c";
    const scopes = "playlist-modify-private";
    const redirect_uri = "http://localhost:3000/";
    const loginUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=token&show_dialog=true`;
    window.location = loginUrl;
    // return loginUrl;
  }

  // untuk mengakses/mengambil token
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
    // console.log(token);
    setToken(token);
  }, [token]);

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

  // fungsi untuk mengsetting button untuk logout
  function logout() {
    setToken("");
    window.localStorage.removeItem("token");
  }
  
  // console.log(searchResults);
  return (
    <>
      {/* mengatur tampilan agar terdapat login dan logout */}
      {token ? (
        <button className="btn login" onClick={logout}>
          Logout
        </button>
      ) : (
        <button className="btn login" onClick={redirectToSapotify}>
          Login
        </button>
      )}

      {/* mengatur form search dan track list */}
      {token && (
        <Home
            token={token}
            onChange={handleInput}
            onSubmit={searchTrack}
            value={searchKey}
            tracks={searchResults}
        />
      )}
    </>
  );
}
