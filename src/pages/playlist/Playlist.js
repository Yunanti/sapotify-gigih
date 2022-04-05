// import React, { useEffect, useState } from "react";
// import CardAlbum from "../../components/App-album/CardAlbum";

// export default function Playlist({ token, selected, setSelected }) {
//   // state untuk menampilkan akun
//   const [user, setUser] = useState([]);

//   // state untuk membuat playlist
//   const [playlist, setPlaylist] = useState([]);

//   // state untuk menambahkan track ke playlist
//   const [trackPlaylist, setTrackPlaylist] = useState([]);

//   // menampilkan akun
//   const [input, setInput] = useState({
//     title: "",
//     description: "",
//   });

//   // console.log(token);
//   useEffect(() => {
//     const getUser = async () => {
//       const response = await fetch("https://api.spotify.com/v1/me", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-type": "application/json",
//         },
//       })
//         .then((res) => res.json())
//         .then((data) => data);
//       setUser(response);
//     };
//     getUser();
//   }, [token]);

//   // menginput playlist dari api
//   const createPlaylist = (e) => {
//     e.preventDefault();
//     fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({
//         name: input.title,
//         description: input.description,
//         public: false,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setPlaylist(data);
//         console.log(data);
//       });
//   };

  

//   // fungsi untuk mengsetting playlist
//   const handlePlaylist = (e) => {
//     const { name, value } = e.target;
//     setInput({ ...input, [name]: value });
//   };

//   return (
//     <div>
//       <div className="form-playlist">
//         <h1 className="text-white">Create Playlist</h1>
//         <p className="text-white">Name: {user.display_name}</p>
//         <p className="text-white">ID: {user.id}</p>
//       </div>

//       <div className="form-playlist">
//         <form onSubmit={createPlaylist}>
//           <input
//             type="text"
//             name="title"
//             placeholder="Title"
//             value={playlist.title}
//             onChange={handlePlaylist}
//             maxLength="10" //maksimal 10 karakter
//           />
//           <textarea
//             type="text"
//             name="description"
//             placeholder="Description"
//             value={playlist.description}
//             onChange={handlePlaylist}
//           />
//           <input type="submit" value="Create Playlist" className="btn" />
//         </form>
//       </div>

//       <div className="form-playlist">
//         <h1 className="text-white">{playlist.name} Playlist</h1>
//         <p className="text-white">{playlist.description}</p>
//         <div className="grid">
//           {trackPlaylist.map((item) => (
//             <React.Fragment key={item.track.id}>
//               <CardAlbum
//                 image={item.track.album.images[0].url}
//                 title={item.track.name}
//                 artist={item.track.artists[0].name}
//               >
//                 Play
//               </CardAlbum>
//             </React.Fragment>
//           ))}
//         </div>
//       </div>

//       {selected.length === 0 ? null : (
//         <button onClick={addTrack}>Save to Playlist</button>
//       )}

//     </div>
//   );
// }
