// import React, { useEffect, useState } from "react";

// // untuk local storage authhooks

// const Album = ({ track }) => {
//   const [btnSelect, setBtnSelect] = useState(false);
//   let selected = JSON.parse(localStorage.getItem("data")); // untuk mengakses/mengambil data dalam lokal storage

//   const handleBtnSelect = () => {
//     setBtnSelect(!btnSelect);
//     // untuk menempatkan track ke my playlist saat button select dan menghapus track saat deselect
//     if (btnSelect === false) {
//       selected[track.id] = track;
//     } else {
//       delete selected[track.id];
//     }
//     localStorage.setItem("data", JSON.stringify(selected));
//   };

//   // console.log(track);

//   useEffect(() => {
//     if (selected[track.id]) {
//       setBtnSelect(true);
//     } else {
//       setBtnSelect(false);
//     }
//   }, [track]);

//   return (
//     <table>
//       <tbody>
//         <tr>
//           <td>
//             <div className="App-album">
//               <div className="album-img">
//                 <img
//                   className="img-album"
//                   src={track.album.images[0].url}
//                   alt={track.name}
//                 />
//               </div>
//               <div className="album-detail">
//                 <h1 className="album-title text-white">{track.name}</h1>
//                 <p className="text-white">
//                   <span className="artist-name">{track.artists[0].name}</span>
//                 </p>
//                 <button className="btn text-white" onClick={handleBtnSelect}>
//                   {btnSelect ? "Deselect" : "Select"}
//                 </button>
//               </div>
//             </div>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   );
// };

// export default Album;
