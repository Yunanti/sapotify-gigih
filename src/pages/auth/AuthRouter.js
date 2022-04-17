import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tokenAuth } from '../../redux/action';

// !ini pakai state

export default function AuthRouter() {
  // ini pakai redux
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  // fungsi untuk login spotify
  function redirectToSapotify() {
    const client_id = '1978717e3d6541e791a061c40ba1124c';
    const scopes = 'playlist-modify-private';
    const redirect_uri = 'http://localhost:3000/';
    const loginUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=token&show_dialog=true`;
    window.location = loginUrl;
    // return loginUrl;
  }

  // !untuk akses/ambil token tanpa local storage
  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const token = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        .split('=')[1];

      window.location.hash = '';
      // console.log(token);
      dispatch(tokenAuth(token)); // dispatch token ke redux
    }
  });

  //    fungsi untuk mengsetting button untuk logout
  function logout() {
    // setToken("");
    dispatch(tokenAuth(''));
    // window.localStorage.removeItem("token");
  }

  return (
    <>
      {/* mengatur tampilan agar terdapat login */}
      <header>
        <h1 className="text-white">Sapotify</h1>
        <div>
          {token ? (
            <button className="login" onClick={logout}>
              Logout
            </button>
          ) : (
            <button className="login" onClick={redirectToSapotify}>
              Login
            </button>
          )}
        </div>
      </header>
    </>
  );
}
