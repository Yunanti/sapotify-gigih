import React, { Component } from 'react'

export default class FormCreatePlaylist extends Component {
  render() {
    return (
      <div className="form-playlist">
        <form>
          <label className="text-white">Title</label>
          <input className="" type="text" />
          <br></br>
          <label className="text-white">Description</label>
          <textarea name="description" className="colm form-desc"></textarea>
          <input type="submit" value="Create Playlist" className="btn" />
        </form>
      </div>
      
    )
  }
}
