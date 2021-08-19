import React from "react";
import SpotifyHelper from "../../helpers/SpotifyHelper";

const SpotifyLogin = ({ loginURL }) => {
  return (
    <div>
      <button
        onClick={() => {
          window.location = loginURL;
        }}
      >
        Login with Spotify
      </button>
    </div>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      loginURL: SpotifyHelper.getLoginUrl(),
    },
  };
}

export default SpotifyLogin;
