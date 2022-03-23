import React from "react";

const ImageAlbum = ({url}) => {
    return (
        <div className='album-img'>
            <img 
                className='img-album'
                src={url} 
                alt='queen'
            />
        </div>
    )
}

export default ImageAlbum;