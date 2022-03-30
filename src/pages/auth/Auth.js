import React, { Component } from "react";
import "../../App.css";
import Album from "../../components/App-album/Album";

export default class Auth extends Component {
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
    const client_id = "1978717e3d6541e791a061c40ba1124c";

    const scopes = "playlist-modify-private";

    const redirect_uri = "http://localhost:3000/";

    const loginUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=token&show_dialog=true`;
    window.location = loginUrl;
    // return loginUrl;
  }

  componentDidMount() {
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
    this.setState({ token: token });
  }

  handleInput(e) {
    this.setState({ searchKey: e.target.value });
  }

  searchTrack(e) {
    e.preventDefault();

    fetch(
      `https://api.spotify.com/v1/search?type=track&include_external=audio&q=${this.state.searchKey}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.state.token}`,
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => this.setState({ searchResults: result.tracks.items }));
  }

  render() {
    const { searchResults } = this.state;

    const renderItem = () => {
      return (
        searchResults &&
        searchResults.map((track, index) => (
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
        <button className="btn login" onClick={() => this.redirectToSapotify()}>
          Login
        </button>

        <form className="form-search" onSubmit={(e) => this.searchTrack(e)}>
          <input
            onChange={(e) => {
              this.handleInput(e);
            }}
            type="text"
            name="search"
            placeholder="Search for a song"
            value={this.state.searchKey}
            className="form-input"
          />
          <input type="submit" value="Search" className="form-submit" />
        </form>

        <div className="grid">{renderItem()}</div>
      </>
    );
  }
}
