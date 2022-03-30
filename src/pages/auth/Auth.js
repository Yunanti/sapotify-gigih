import React, { Component } from "react";
import "../../App.css";
import Album from "../../components/App-album/Album";

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      searchKey: "",
      searchResults: [],
    };
  }

  generateRandomString = (length) => {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  redirectToSapotify() {
    const state_key = "spotify_auth_state";
    const scopes = "playlist-modify-private";
    let token = this.generateRandomString(16);
    let redirect_uri = "http://localhost:3000/";
    let authEndpoint = "https://accounts.spotify.com/authorize";
    const client_id = "1978717e3d6541e791a061c40ba1124c";

    const loginUrl =
      encodeURIComponent(authEndpoint) +
      "?client_id=" +
      encodeURIComponent(client_id) +
      "&redirect_uri=" +
      encodeURIComponent(redirect_uri) +
      "&scope=" +
      encodeURIComponent(scopes) +
      "&response_type=token&state=" +
      encodeURIComponent(token);

    localStorage.setItem(state_key, token);
    window.location = loginUrl;
    this.addToken();
    // return loginUrl;
  }

  addToken() {
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
    this.setState({token: token});
    console.log(token);
  }

  handleInput(e) {
    this.setState({searchKey: e.target.value});
  }

  searchTrack(e) {
    e.preventDefault();

    fetch(
      `https://api.spotify.com/v1/search?type=track&include_external=audio&q=${this.state.searchKey}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "aplication/json",
        },
      }
    )
    .then((response) => response.json())
    .then((result) => this.setState({searchResults: result.tracks.items}));
  }


  // componentDidMount() {
  //   const hash = window.location.hash;
  //   let token = window.localStorage.getItem("token");

  //   if (!token && hash) {
  //     token = hash
  //       .substring(1)
  //       .split("&")
  //       .find((elem) => elem.startsWith("access_token"))
  //       .split("=")[1];

  //     window.location.hash = "";
  //     window.localStorage.setItem("token", token);
  //   }

  //   this.setState({ token: token });
  // }

  render() {
    const { searchResults } = this.state;

    const renderItem = () => {
      return (
        searchResults && searchResults.map((track, index) => (
          <React.Fragment key={index}>
            <Album 
             url={track.album.images[0].url}
             nameSong={track.name}
             nameArtist={track.artists[0].name}
             alt={track.name}
            />
          </React.Fragment>
        ))

        // <div>
        //   <h1 className="text-white">Auth</h1>
        //   <a href={this.redirectToSapotify()}>Click to login auth</a>
        //   <p>{token}</p>
  
        //   <input
        //     name="search"
        //     type="text"
        //     placeholder="Search"
        //     onChange={this.handleInput}
        //   />
        //   <button onClick={this.handleSubmit}>Search</button>
        // </div>
      );
    };

    return (
      <>
        <button className="btn" onClick={() => this.redirectToSapotify()}>Sapotify</button>

        <form className="form-search" onSubmit={(e) => this.searchTrack(e)}>
          <input
           onChange={(e) => {
             this.handleInput(e)
           }}
           type="text"
           name="search"
           placeholder="Search for a song"
           value={this.state.searchKey}
          />
          <input type="submit" value="Search" />
        </form>

        <div className="tbl">{renderItem()}</div>

      </>
    );
    
  }

  // generateRandomString = (length) => {
  //   let text = '';
  //   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   for (let i = 0; i<length; i++) {
  //     text += possible.charAt(Math.floor(Math.random()*possible.length));
  //   }
  //   return text;
  // }

  // redirectToSapotify = () => {
  //   let stateKey = 'spotify_auth_state';
  //   let authEndpoint = 'https://accounts.spotify.com/authorize';
  //   let redirectUri = 'http://localhost:3000/';
  //   let client_id = "1978717e3d6541e791a061c40ba1124c";
  //   let text = this.generateRandomString(16);
  //   let scopes = 'playlist-modify-private';

  //   let loginUrl = `${authEndpoint}?client_id=${client_id}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&state=${text}`;
  //   return loginUrl;

  //   localStorage.setItem(stateKey, text);
  //   window.location = url;
  //   this.addToken();
  // }

  // addToken() {
  //   let hash = window.location.hash;

  // }
}
