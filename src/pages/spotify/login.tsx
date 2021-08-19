import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPageContext } from "next";
import React from "react";
import SpotifyHelper from "../../helpers/SpotifyHelper";

const SpotifyLogin = ({ loginURL }) => {
  return (
    <main>
      <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
        <button
          onClick={() => {
            window.location = loginURL;
          }}
          className="bg-green-400 hover:bg-green-600 text-white p-4 font-bold text-lg transition-colors"
          style={{ borderRadius: 40 }}
        >
          <FontAwesomeIcon icon={faSpotify} className="mr-2" />
          Login with Spotify
        </button>
      </div>
    </main>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const {
    headers: { host },
  } = context.req;

  SpotifyHelper.setRedirectURI(`http://${host}/spotify/authorize`);
  return {
    props: {
      loginURL: SpotifyHelper.getLoginUrl(),
    },
  };
}

export default SpotifyLogin;
