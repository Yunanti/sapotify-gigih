import React from "react";

const DetailAlbum = ({nameSong, nameArtist, releaseDate, totalTrack}) => {
    return (
        <div className='album-detail'>
          <h1 className='album-title text-white'>{nameSong}</h1>
          <div className='artist-info'>
            <p className='text-white'>Artist : <span className='artist-name'>{nameArtist}</span></p>
            <p className='text-white'>Release Date : <span className='release-date'>{releaseDate}</span></p>
            <p className='text-white'>Total Track : <span className='total-tracks'>{totalTrack}</span></p>
          </div>
        </div>
    )
}

export default DetailAlbum;